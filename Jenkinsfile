pipeline {
  agent any
  
  environment {
    ENV_TEST = credentials('ENV_TEST')
    ENV_PRODUCTION = credentials('ENV_PRODUCTION')
    
    GOOGLE_APPLICATION_CREDENTIALS = credentials('GOOGLE_APPLICATION_CREDENTIALS')
  }

  parameters {
    string(name: 'image_tag', defaultValue: 'latest', description: 'Etiqueta de la imagen')  
  }

  stages {
    stage('Run Tests Phase 1') {
      parallel {
        stage('Test On Customer Service') {
          steps {
            sh '''
              cd Services/customer
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Team Service') {
          steps {
            sh '''
              cd Services/team
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Match Service') {
          steps {
            sh '''
              cd Services/match
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }
      }
    }

    stage('Run Tests Phase 2') {
      parallel {
        stage('Test On Stadium Service') {
          steps {
            sh '''
              cd Services/stadium
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Teachnical Director Service') {
          steps {
            sh '''
              cd Services/technical_director
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Post Service') {
          steps {
            sh '''
              cd Services/post
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }
      }
    }

    stage('Run Tests Phase 3') {
      parallel {
        stage('Test On Auth Service') {
          steps {
            sh '''
              cd Services/auth
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Employee Service') {
          steps {
            sh '''
              cd Services/employee
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Country Service') {
          steps {
            sh '''
              cd Services/country
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }
      }
    }
  }
}