# Frontend Jenkins Pipeline Setup

This document provides instructions for setting up and configuring the Jenkins pipeline for the Flight Reservation Application frontend.

## Prerequisites

1. Jenkins Server installed and running
2. AWS CLI installed on Jenkins server
3. Node.js and NVM installed on Jenkins server
4. AWS S3 bucket created and configured for static website hosting
5. AWS CloudFront distribution (optional, for CDN)

## Required Jenkins Plugins

1. **Core Plugins:**
   - Pipeline: Declarative
   - Pipeline: GitHub
   - Pipeline: REST API
   - Pipeline: Build Step

2. **Build Tools:**
   - NodeJS Plugin
   - Git Integration

3. **Testing:**
   - JUnit

4. **AWS:**
   - AWS Pipeline Steps
   - AWS Credentials

5. **Workspace Management:**
   - Workspace Cleanup

## Pipeline Configuration Steps

### 1. Install Required Plugins
1. Go to Jenkins Dashboard
2. Navigate to Manage Jenkins > Manage Plugins
3. Install all the required plugins listed above
4. Restart Jenkins after plugin installation

### 2. Configure Tools
1. Go to Manage Jenkins > Global Tool Configuration
2. Configure the following tools:
   - NodeJS (version 18.x)
   - Git

### 3. Configure AWS Credentials
1. Go to Manage Jenkins > Credentials > System
2. Add AWS credentials:
   - Kind: AWS Credentials
   - ID: aws-credentials
   - Access Key ID: Your AWS Access Key
   - Secret Access Key: Your AWS Secret Key

### 4. Environment Variables
Update the following environment variables in the Jenkinsfile:
```groovy
environment {
    AWS_CREDENTIALS = credentials('aws-credentials')
    S3_BUCKET = 'your-s3-bucket-name'
    AWS_REGION = 'your-aws-region'
    NODE_VERSION = '18.x'
    CLOUDFRONT_DISTRIBUTION_ID = 'your-cloudfront-distribution-id'
}
```

## Pipeline Stages

The pipeline consists of the following stages:

1. **PULL**
   - Checks out the source code from the repository

2. **Install Dependencies**
   - Installs Node.js using NVM
   - Installs project dependencies using npm

3. **Lint**
   - Runs ESLint to check code quality
   - Ensures code style consistency

4. **Unit Tests**
   - Runs Jest tests
   - Generates JUnit test reports

5. **Build**
   - Creates production build
   - Optimizes assets
   - Generates static files

6. **S3 Deploy**
   - Syncs build files to S3 bucket
   - Creates CloudFront invalidation (if configured)

## S3 Bucket Configuration

1. Create an S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

2. Configure bucket for static website hosting:
```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

3. Set bucket policy for public access:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

## CloudFront Configuration (Optional)

1. Create CloudFront distribution:
   - Origin: S3 bucket
   - Default root object: index.html
   - Cache behavior: Redirect HTTP to HTTPS

2. Configure error pages:
   - 403: /index.html
   - 404: /index.html

## Running the Pipeline

1. Create a new Pipeline job in Jenkins
2. Configure the job to use the Jenkinsfile from SCM
3. Set the SCM to Git and provide repository details
4. Save and run the pipeline

## Troubleshooting

Common issues and solutions:

1. **Build Fails**
   - Check Node.js version
   - Verify npm dependencies
   - Check for syntax errors

2. **S3 Deploy Fails**
   - Verify AWS credentials
   - Check S3 bucket permissions
   - Ensure bucket exists

3. **CloudFront Issues**
   - Verify distribution ID
   - Check cache invalidation
   - Monitor distribution status

## Security Considerations

1. Store AWS credentials securely
2. Use IAM roles with minimal permissions
3. Enable S3 bucket encryption
4. Configure CloudFront security headers
5. Regular security updates

## Maintenance

1. Regular dependency updates
2. Monitor build performance
3. Review and update AWS configurations
4. Backup Jenkins configuration
5. Monitor S3 storage usage 