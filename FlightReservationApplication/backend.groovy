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
        stage('Docker-build'){
            steps{
                sh '''
                    cd FlightReservationApplication
                    docker build -t mayurwagh/flightreservation-pls-10-12:latest
                    docker push mayurwagh/flightreservation-pls-10-12:latest
                    docker rmi mayurwagh/flightreservation-pls-10-12:latest
              '''
            }
        }
        stage('Deploy'){
            steps{
                sh '''
                        cd FlightReservationApplication
                        kubectl apply -f k8s/
                '''
            }
        }

    }
}