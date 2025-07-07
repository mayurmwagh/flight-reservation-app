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
                echo 'Building the application...'
            }
        }
         stage('Test') {
            steps{
                echo 'testing the application...'
            }
        }
         stage('Deploy') {
            steps{
                echo 'deploying the application...'
            }
        }

    }
}