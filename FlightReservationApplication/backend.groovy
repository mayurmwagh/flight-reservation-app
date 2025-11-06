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
                sh '''
                 cd FlightReservationApplication
                 mvn clean package
                '''
            }
        }
        stage('Quality-Analysis'){
            steps {
                withSonarQubeEnv(installationName: 'sonar', credentialsId: 'sonar-tokan') {
                sh '''
                  cd FlightReservationApplication
                  mvn sonar:sonar -Dsonar.projectKey=flight-reservation
                '''
                }
            }
        }

    }
}