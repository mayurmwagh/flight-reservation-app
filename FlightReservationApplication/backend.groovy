pipeline {
    agent any 
    stages {
        stage('code-pull'){
            steps {
                git branch: 'main', url: 'https://github.com/mayurmwagh/flight-reservation-app.git'
            }
        }
        stage('Build'){
            steps {
                ''
            }
        }
        stage('QA-stage'){
            steps {
                ''
            }
        }
        stage('Dockerbuild'){
            steps {
                ''
            }
        }
    }
}