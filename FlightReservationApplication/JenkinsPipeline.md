# Jenkins Pipeline Setup for Flight Reservation Application

This document provides detailed instructions for setting up and configuring the Jenkins pipeline for the Flight Reservation Application.

## Prerequisites

1. Jenkins Server installed and running
2. Docker installed on Jenkins server
3. Kubernetes cluster access configured
4. SonarQube server running
5. Maven and JDK 17 installed on Jenkins server

## Jenkins Installation
```shell
apt update 
apt install openjdk-17-jdk -y
wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
apt-get update
apt-get install jenkins -y
systemctl start jenkins
```

## SonarQube Installation
```shell
# Install and configure Database
apt install openjdk-17-jdk -y
apt install postgresql -y
systemctl start postgresql
sudo -u postgres psql
>> CREATE USER linux PASSWORD 'redhat';
>> CREATE DATABASE sonarqube;
>> GRANT ALL PRIVILEGES ON DATABASE sonarqube TO linux;
>> \c sonarqube;
>> GRANT ALL PRIVILEGES ON SCHEMA public TO linux;
>> \q
# Configure Linux Machine
sysctl -w vm.max_map_count=524288
sysctl -w fs.file-max=131072
ulimit -n 131072
ulimit -u 8192
# Install and Configure Sonarqube
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-25.5.0.107428.zip
apt install unzip -y
unzip sonarqube-25.5.0.107428.zip
mv sonarqube-25.5.0.107428 /opt/sonar
cd /opt/sonar
vim conf/sonar.properties
>> sonar.jdbc.username=linux
>> sonar.jdbc.password=redhat
>> sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube
useradd sonar -m
chown sonar:sonar -R /opt/sonar
su sonar
cd /opt/sonar/bin/linux-x86-64
./sonar.sh start
./sonar.sh status 
```

## Install Docker
```shell
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
systemctl start docker
```

## Install and configure kubectl  
```shell
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client

# Install AWS ClI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
aws configure
```

## Install maven and git
```shell
apt install maven -y
```

## Required Jenkins Plugins

1. **Core Plugins:**
   - Pipeline Plugin
   - Git Plugin
   - GitHub Plugin
   - Install git, docker, kubectl, maven, sonarqube
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
   - SonarQube Quality Gates Plugin
   - SonarQube Scanner Plugin

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
   - Workspace Cleanup Plugin

## Pipeline Configuration Steps

### 1. Install Required Plugins
1. Go to Jenkins Dashboard
2. Navigate to Manage Jenkins > Manage Plugins
3. Install all the required plugins listed above
4. Restart Jenkins after plugin installation

### 2. Configure Tools
1. Go to Manage Jenkins > Global Tool Configuration
2. Configure the following tools:
   - JDK17
   - Maven
   - Docker
   - kubectl

### 3. Configure Credentials
1. Go to Manage Jenkins > Credentials > System
2. Add the following credentials:
   - Docker Registry credentials (ID: 'docker-cred')
   - SonarQube token (ID: 'sonar-cred')
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
    DOCKER_IMAGE_NAME = 'flight-reservation-app'
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



## Configure Pipeline Stages

### Github Jenkins Interation
- Create Webhook to source repo http://<Jenkins-Ip>:8080/github-webhook

### Maven Stage 

### Sonarqube Jenkins Integration
- Install sonarqube scanner and Quality gate plugin in Jenkins
- Create webhook in sonarqube http://<JENKINS_IP>:8080/sonarqube-webhook
- Create local project and token in Sonarqube
- Store token in Jenkins's Credentials
- Configure Sonarqube server in Jenkins, Manage Jenkins > System > SonarQube Servers

### Docker Build and Docker Push
- Add jenkins user in docker group to allow jenkins to use docker commands

### Kubectl Integration
- Install AWS CLI
- login using `aws configure`
- update ~/.kube/config to authenticate with cluster
`aws eks update-kubeconfig --name cbz-cluster-dev --region eu-west-2`
- copy kubeconfig to jenkins user `cp -rf ~/.kube /var/lib/jenkins/`
- allow jenkins to use kubeconfig `chown jenkins -R /var/lib/jenkins/.kube`

### Create and update DB cred
- Create DB with name flightdb
- update DB credentials in application.properties

## Post-Build Actions

The pipeline includes the following post-build actions:
- Success notification
- Failure notification
- Workspace cleanup

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





