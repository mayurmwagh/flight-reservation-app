pipeline{
    agent any
    stages{
        stage('Code-pull'){
            steps{
                git branch: 'main', url: 'https://github.com/mayurmwagh/flight-reservation-app.git'
            }

        }
        stage('Code-Build'){
            steps{
                sh '''
                    cd FlightReservationApplication
                    mvn clean package
                '''
            }

        }
        stage('Code-Test'){
            steps{
               withSonarQubeEnv(installationName: 'Sonar', credentialsId: 'sonar-token') {
                 sh '''
                    cd FlightReservationApplication
                    mvn sonar:sonar -Dsonar.projectKey=flight-reservation
                 '''
                }
            }

        }
        stage('Docker-Build'){
            steps{
                sh '''
                    cd FlightReservationApplication
                    docker build -t mayurwagh/flightreservation-pls17:latest .
                    docker push mayurwagh/flightreservation-pls17:latest
                    docker rmi mayurwagh/flightreservation-pls17:latest

                '''
                
            }

        }
        stage('Deploy'){
            steps{
                sh '''
                    kubectl apply -f k8s/
                '''
            }
        }
    }
}