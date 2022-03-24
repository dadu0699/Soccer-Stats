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
    
    stage('Run Tests') {
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
      }
    }

  }
}