pipeline {
    agent any

    stages {
        stage('PULL') {
            steps {
                git branch: 'main', url: 'https://github.com/mayurmwagh/flight-reservation-app.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    cd FlightReservationApplication
                    mvn clean package
                '''
            }
        }

        stage('Qa-Test') {
            steps {
                withSonarQubeEnv(installationName: 'sonar', credentialsId: 'Sonar-token') {
                    sh '''
                        cd FlightReservationApplication
                        mvn sonar:sonar -Dsonar.projectKey=flight-reservation
                    '''
                }
            }
        }

        // stage('Quality-Gate') {
        //     steps {
        //         timeout(time: 10, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }

        stage('Docker-build') {
            steps {
                sh '''
                    cd FlightReservationApplication
                    docker build -t mayurwagh/flight-reservation12:latest .
                    docker push mayurwagh/flight-reservation12:latest
                    docker rmi mayurwagh/flight-reservation12:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd FlightReservationApplication
                    kubectl apply -f k8s/
                '''
            }
        }
    }
}
