pipeline {
    agent any
    
    environment {
        CI = 'false'
    }
    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install --force'
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                script {
                    docker.build('ipin0917826334/forum-client', 'MiniProject/client')
                    docker.build('ipin0917826334/forum-server', 'MiniProject/server')
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        sh 'docker push ipin0917826334/forum-client'
                        sh 'docker push ipin0917826334/forum-server'
                    }
                }
            }
        }
    }
}
