# AWS Static Website Hosting

This is a static website hosted on AWS with a custom domain name, HTTPS security and Global Content Delivery. 

This project leverages:
1. S3 buckets for hosting
2. GitHub Actions to push changes to S3 everytime a commit is made and pushed
3. Amazon CloudFront for Global Distribution
4. Amazon Route53 for DNS management
5. AWS Certificate Manager (ACM) for securing my site with SSL/TLS, and 
6. AWS Web Application Firewall (WAF) to protect against common web exploits