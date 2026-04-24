pipeline {
    agent any
     environment{
        DOCKER_USER = "farhanraju"
        FRONTEND_IMAGE = "maya-frontend"
        K8S_CRED = "k8s-config"
    }

    stages {
        stage('1st Git CheckOut') {
            steps {
                git branch: 'main', credentialsId: '17', url: 'https://github.com/Farhan81684/maya-fe.git'
            }
        }
        stage('2nd Build&Push frontend') {
            steps {
                script{
                    withCredentials([string(credentialsId: 'id_for_imagepush', variable: 'dockerhubpwd')]) {
                        sh "docker login -u ${DOCKER_USER} -p ${dockerhubpwd}"
                        sh "docker build --build-arg NEXT_PUBLIC_API_URL=http://api.maya.local/server -t ${DOCKER_USER}/${FRONTEND_IMAGE}:latest ."
                        sh "docker push ${DOCKER_USER}/${FRONTEND_IMAGE}:latest "
                    }
                }
            }
        }
        stage('3rd Deploy to Kubernates') {
            steps {
                script{
                    withKubeConfig([credentialsId: 'k8s-config']) {
                        sh 'kubectl apply -f k8s-configs/'
                        sh 'kubectl rollout restart deployment maya-frontend'
                    }
                }
            }
        }
    }
}
