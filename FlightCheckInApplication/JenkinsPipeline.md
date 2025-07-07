# Flight Check-In Application Jenkins Pipeline Setup

This document provides instructions for setting up and configuring the Jenkins pipeline for the Flight Check-In Application.

## Prerequisites

1. Jenkins Server installed and running
2. Docker installed on Jenkins server
3. Kubernetes cluster access configured
4. SonarQube server running
5. Maven and JDK 17 installed on Jenkins server

## Required Jenkins Plugins

1. **Core Plugins:**
   - Pipeline: Declarative
   - Pipeline: GitHub
   - Pipeline: REST API
   - Pipeline: Build Step
   - Pipeline: Stage View

2. **Build Tools:**
   - Maven Integration
   - JDK Tool
   - Git Integration

3. **Testing & Quality:**
   - JUnit
   - JaCoCo
   - SonarQube Scanner for Jenkins
   - SonarQube Quality Gates Plugin

4. **Docker:**
   - Docker Pipeline
   - Docker plugin
   - Docker API Plugin
   - Docker Commons Plugin

5. **Kubernetes:**
   - Kubernetes CLI
   - Kubernetes Plugin

6. **Credentials:**
   - Credentials Binding
   - Docker Credentials

7. **Workspace Management:**
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
   - JDK 17
   - Maven
   - Docker
   - kubectl

### 3. Configure Credentials
1. Go to Manage Jenkins > Credentials > System
2. Add the following credentials:
   - Docker Registry credentials (ID: 'docker-credentials')
   - SonarQube token (ID: 'sonar-token')
   - Git credentials (if using private repository)

### 4. Configure SonarQube
1. Go to Manage Jenkins > Configure System
2. Add SonarQube server configuration:
   - Name: SonarQube
   - Server URL: http://your-sonarqube-server:9000
   - Authentication token: Use the sonar-token credential

### 5. Environment Variables
Update the following environment variables in the Jenkinsfile:
```groovy
environment {
    DOCKER_REGISTRY = 'your-docker-registry'
    DOCKER_IMAGE_NAME = 'flight-checkin-app'
    DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
    MAVEN_HOME = tool 'Maven'
    JAVA_HOME = tool 'JDK17'
    SONAR_HOST_URL = 'http://your-sonarqube-server:9000'
    SONAR_TOKEN = credentials('sonar-token')
}
```

## Pipeline Stages

The pipeline consists of the following stages:

1. **PULL**
   - Checks out the source code from the repository

2. **BUILD**
   - Builds the application using Maven
   - Skips tests during build phase

3. **QA Test**
   - Runs unit tests
   - Generates JUnit test reports
   - Generates JaCoCo coverage reports

4. **SonarQube Analysis**
   - Runs SonarQube scanner
   - Analyzes code quality
   - Generates code coverage reports

5. **Quality Gate**
   - Waits for SonarQube analysis to complete
   - Checks quality gate status
   - Fails pipeline if quality gate doesn't pass

6. **DOCKER BUILD**
   - Builds Docker image
   - Tags image with build number

7. **DOCKER PUSH**
   - Pushes Docker image to registry
   - Uses configured Docker credentials

8. **DEPLOY**
   - Deploys application to Kubernetes cluster
   - Updates deployment with new image

## Running the Pipeline

1. Create a new Pipeline job in Jenkins
2. Configure the job to use the Jenkinsfile from SCM
3. Set the SCM to Git and provide repository details
4. Save and run the pipeline

## Troubleshooting

Common issues and solutions:

1. **Docker Build Fails**
   - Check Docker daemon is running
   - Verify Docker credentials are correct
   - Ensure Dockerfile is in the correct location

2. **SonarQube Analysis Fails**
   - Verify SonarQube server is running
   - Check SonarQube token is valid
   - Ensure project key is unique

3. **Kubernetes Deployment Fails**
   - Verify kubectl configuration
   - Check namespace exists
   - Ensure deployment name matches

4. **Build Fails**
   - Check Maven and JDK installation
   - Verify pom.xml is valid
   - Check for dependency issues

## Security Considerations

1. Store sensitive credentials in Jenkins credentials store
2. Use environment variables for configuration
3. Implement proper access control
4. Regular security updates for Jenkins and plugins
5. Monitor pipeline execution logs

## Maintenance

1. Regular plugin updates
2. Monitor pipeline performance
3. Review and update quality gates
4. Backup Jenkins configuration
5. Monitor disk space usage 