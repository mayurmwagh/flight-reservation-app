pipeline{
    agent any 
    stages{
        stage('Code-pull'){
            steps{
                git branch: 'main', url: 'https://github.com/mayurmwagh/flight-reservation-app.git'
            }
        }
        stage('Build'){
            steps{
                sh '''
                    cd FlightRerservationApplication
                    mvn clean package
                '''
            }
        }
        stage('QA-Test'){
            steps{
                withSonarQubeEnv(installationName: 'sonar', credentialsId: 'sonar-token') {
                  sh'''
                     cd FlightRerservationApplication
                     mvn soanr:sonar -Dsonar.projectKey=flight-reservation   
                  '''
                }
            }
        }
        stage('Docker-build'){
            steps{
                sh'''
                    cd FlightRerservationApplication    
                    docker build -t mayurwagh/flight-reservation-15-16:latest . 
                    docker push mayurwagh/flight-reservation-15-16:latest
                    docker rmi mayurwagh/flight-reservation-15-16:latest
                '''
            }
        }
        stage('Deploy'){
            steps{
                sh'''
                    cd FlightRerservationApplication    
                    kubectl apply -f k8s/
                '''
            }
        }

    }
}