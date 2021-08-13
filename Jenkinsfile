pipeline {
    agent any

     //Cron Syntax
     // drive this pipeline every 3 minutes
    triggers {
        pollSCM('*/3 * * * *')
    }

    // Credentials file 
    environment {
        AWS_ACCESS_KEY_ID = credentials('awsAccessKeyId')
        AWS_SECRET_ACCESS_KEY = credentials('awsSecretAccessKey')
        AWS_DEFAULT_REGION = 'ap-northeast-2'
        HOME = '.' // Avoid npm root owned
        GIT_URL= 'https://github.com/aota18/DayFeel'
        APP_NAME= 'dayfeel-app'
    }
    
    stages {
        // Download Repository

        stage('Prepare'){
            agent any

            steps {
                echo "Let's start Long Journey ! 🙌 "
                echo "Clonning Repository..."

                git url: "${GIT_URL}",
                    branch: "master",
                    credentialsId: 'github'
            }


            // Define the behavior after above steps
            post {
                //If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.

                success {
                    echo 'Successfully Cloned Repository'
                }

                always {
                    echo "I tried..."
                }

                cleanup {
                    echo "after all other post conditipon"
                }
            }
        }

        // 
         stage("Build ${APP_NAME}") {
            agent {
                docker {
                    image 'node:14.15.2-alpine'
                }
            }

            steps {
                echo "Build ${APP_NAME}"

                sh 'npm install'
                sh 'npm run build'
                
            }

            post {
                failure {
                    //Error terminates all
                    error "This pipeline stops here..."
                }
            }
        }

        stage('Build Docker') {
            agent any 

            steps {
                dir('./'){
                    sh "docker build . -t ${APP_NAME}"
                }
            }
        }

        stage("Deploy ${APP_NAME}"){
            agent any

            steps {
                echo "Deploy ${APP_NAME}"

                sh "docker ps -f name=${APP_NAME} -q | xargs --no-run-if-empty docker container stop"
                sh "docker container ls -a -fname=${APP_NAME} -q | xargs -r docker container rm"
                sh "docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi"
                sh """
                docker run -p 80:80 -d --name ${APP_NAME} ${APP_NAME}
                """

            }

        }

    

       

    }
}