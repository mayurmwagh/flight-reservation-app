pipeline{
    agent any 
    stages{
        stage('Code-pull'){
            steps{
                git branch: 'main', url: 'https://github.com/mayurmwagh/flight-reservation-app.git'
            }
        }
        stage('Code-build'){
            steps{
                sh '''
                cd FLightReservationApplication
                mvn clean package
                '''
            }
        }
        stage('QA-TEST'){
            steps{
                withSonarQubeEnv(installationName:'sonar', credentialsId: 'Sonar-token') {
                    sh '''
                        cd FLightReservationApplication
                        mvn sonar:sonar -Dsonar.projectKey=flight-reservation
                    '''
                }
            }
            
        }
    }
}