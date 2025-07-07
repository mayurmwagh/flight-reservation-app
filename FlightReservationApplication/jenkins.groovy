pipeline {
    agent any
    stages {
        stage('PULL') {
            steps{
                git branch: 'main', url: 'https://github.com/mayurmwagh/flight-reservation-app.git'
            }
        }
         stage('Build') {
            steps{
                
            }
        }
         stage('Test') {
            steps{
                
            }
        }
         stage('Deploy') {
            steps{
                
            }
        }

    }
}