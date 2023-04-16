pipeline {
    agent any
    
    environment {
        CI = 'false'
        DOCKERHUB_COMMON_CREDS = credentials('dockerhub')
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

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                script {
                    docker.build('ipin0917826334/forum-server', './server')
                    docker.build('ipin0917826334/forum-client')
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        sh 'docker tag forum-client ipin0917826334/forum-client'
                        sh 'docker image push ipin0917826334/forum-client'
                        sh 'docker tag forum-server ipin0917826334/forum-server'
                        sh 'docker image push ipin0917826334/forum-server'
                        
                    }
                }
            }
        }
    }
}
