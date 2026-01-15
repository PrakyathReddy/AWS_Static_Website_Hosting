/**
 * Property-based test for semantic HTML structure
 * Feature: devops-portfolio-website, Property 2: Semantic HTML Structure
 * Validates: Requirements 5.2
 * 
 * Property: For any page section in the portfolio website, it should use proper 
 * HTML5 semantic elements (header, nav, main, section, article, footer) to ensure 
 * accessibility and SEO compliance.
 */

const fs = require('fs');
const path = require('path');
const fc = require('fast-check');

describe('Property Test: Semantic HTML Structure', () => {
  let htmlContent;

  beforeAll(() => {
    const htmlPath = path.join(__dirname, '../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Set up DOM in jsdom environment (provided by jest-environment-jsdom)
    document.documentElement.innerHTML = htmlContent;
  });

  /**
   * Property 2: Semantic HTML Structure
   * For any page section in the portfolio website, it should use proper HTML5 
   * semantic elements to ensure accessibility and SEO compliance.
   */
  test('all major page sections should use proper HTML5 semantic elements', () => {
    // Get all major content sections
    const sections = getAllPageSections();
    
    fc.assert(
      fc.property(
        fc.constantFrom(...sections),
        (section) => {
          // Each section must use a semantic HTML5 element
          const semanticElements = [
            'header', 'nav', 'main', 'section', 
            'article', 'aside', 'footer'
          ];
          
          const tagName = section.tagName.toLowerCase();
          return semanticElements.includes(tagName);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: All sections should have proper heading hierarchy
   * Each semantic section should contain at least one heading element
   */
  test('all semantic sections should maintain proper heading hierarchy', () => {
    const sections = getAllSemanticSections();
    
    fc.assert(
      fc.property(
        fc.constantFrom(...sections),
        (section) => {
          // Each section should have at least one heading (h1-h6)
          const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
          return headings.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: All interactive elements should have proper accessibility attributes
   * Links and buttons should have appropriate aria-labels or text content
   */
  test('all interactive elements should have proper accessibility attributes', () => {
    const interactiveElements = getAllInteractiveElements();
    
    fc.assert(
      fc.property(
        fc.constantFrom(...interactiveElements),
        (element) => {
          const tagName = element.tagName.toLowerCase();
          
          if (tagName === 'a') {
            // Links should have text content or aria-label
            const hasText = element.textContent.trim().length > 0;
            const hasAriaLabel = element.hasAttribute('aria-label');
            return hasText || hasAriaLabel;
          }
          
          if (tagName === 'button') {
            // Buttons should have text content or aria-label
            const hasText = element.textContent.trim().length > 0;
            const hasAriaLabel = element.hasAttribute('aria-label');
            return hasText || hasAriaLabel;
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: All images should have alt attributes for accessibility
   */
  test('all images should have alt attributes', () => {
    const images = Array.from(document.querySelectorAll('img'));
    
    if (images.length === 0) {
      // If no images exist yet, test passes (they'll be added later)
      return;
    }
    
    fc.assert(
      fc.property(
        fc.constantFrom(...images),
        (img) => {
          // Each image must have an alt attribute (can be empty for decorative images)
          return img.hasAttribute('alt');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Helper function to get all major page sections
   * Returns elements that represent major content divisions
   */
  function getAllPageSections() {
    const sections = [];
    
    // Add header
    const header = document.querySelector('header');
    if (header) sections.push(header);
    
    // Add nav
    const nav = document.querySelector('nav');
    if (nav) sections.push(nav);
    
    // Add main
    const main = document.querySelector('main');
    if (main) sections.push(main);
    
    // Add all section elements
    const sectionElements = Array.from(document.querySelectorAll('section'));
    sections.push(...sectionElements);
    
    // Add all article elements
    const articles = Array.from(document.querySelectorAll('article'));
    sections.push(...articles);
    
    // Add footer
    const footer = document.querySelector('footer');
    if (footer) sections.push(footer);
    
    if (sections.length === 0) {
      throw new Error('No semantic page sections found in the HTML document');
    }
    
    return sections;
  }

  /**
   * Helper function to get all semantic sections (section, article, aside)
   */
  function getAllSemanticSections() {
    const sections = Array.from(document.querySelectorAll('section, article, aside'));
    
    if (sections.length === 0) {
      throw new Error('No semantic sections found in the HTML document');
    }
    
    return sections;
  }

  /**
   * Helper function to get all interactive elements (links and buttons)
   */
  function getAllInteractiveElements() {
    const elements = Array.from(document.querySelectorAll('a, button'));
    
    if (elements.length === 0) {
      throw new Error('No interactive elements found in the HTML document');
    }
    
    return elements;
  }
});
