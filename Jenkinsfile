pipeline {
  agent any
  
  environment {
    ENV_TEST = credentials('ENV_TEST')
    ENV_PRODUCTION = credentials('ENV_PRODUCTION')

    TESTING_IP = credentials('TESTING_IP')
    PRODUCTION_IP = credentials('PRODUCTION_IP')
    
    GCR_ID = credentials('PROJECT_ID')
    // Credenciales (.json) con los permisos de: 'Administrador de Acceso a VPC sin servidores', 'Administrador de Compute', 'Agente de servicios de recursos de nube', 'Visualizador de objetos de Storage' 
    GOOGLE_APPLICATION_CREDENTIALS = credentials('GOOGLE_APPLICATION_CREDENTIALS')
  }

  parameters {
    string(name: 'image_tag', defaultValue: 'latest', description: 'Etiqueta de la imagen')  
  }

  stages {
    stage('Set Credentials') {
      steps {
        sh 'cat ${GOOGLE_APPLICATION_CREDENTIALS} | docker login -u _json_key --password-stdin https://gcr.io'
      }
    }

    stage('Run Tests Phase 1') {
      parallel {
        stage('Test On Customer Service') {
          steps {
            sh '''
              cd Services/customer
              rm -rf .env.test
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
              rm -rf .env.test
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
              rm -rf .env.test
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
        stage('Test On Competition Service') {
          steps {
            sh '''
              cd Services/competition
              rm -rf .env.test
              cp ${ENV_TEST} .env.test

              # npm install
              # npm run test
            '''
          }
        }

        stage('Test On Stadium Service') {
          steps {
            sh '''
              cd Services/stadium
              rm -rf .env.test
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
              rm -rf .env.test
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
        stage('Test On Player Service') {
          steps {
            sh '''
              cd Services/player
              rm -rf .env.test
              cp ${ENV_TEST} .env.test

              # npm install
              # npm run test
            '''
          }
        }

        stage('Test On Post Service') {
          steps {
            sh '''
              cd Services/post
              rm -rf .env.test
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }

        stage('Test On Auth Service') {
          steps {
            sh '''
              cd Services/auth
              rm -rf .env.test
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }
      }
    }

    stage('Run Tests Phase 4') {
      parallel {
        stage('Test On Administrator Service') {
          steps {
            sh '''
              cd Services/administrator
              rm -rf .env.test
              cp ${ENV_TEST} .env.test

              # npm install
              # npm run test
            '''
          }
        }

        stage('Test On Employee Service') {
          steps {
            sh '''
              cd Services/employee
              rm -rf .env.test
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
              rm -rf .env.test
              cp ${ENV_TEST} .env.test

              npm install
              npm run test
            '''
          }
        }
      }
    }

    stage('Build Images Phase 1') {
      parallel {
        stage('Build Customer Image') {
          steps {
            sh '''
              cd Services/customer
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/customer-service:${image_tag} .
              docker push ${GCR_ID}/customer-service:${image_tag}
            '''
          }
        }

        stage('Build Team Image') {
          steps {
            sh '''
              cd Services/team
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/team-service:${image_tag} .
              docker push ${GCR_ID}/team-service:${image_tag}
            '''
          }
        }

        stage('Build Match Image') {
          steps {
            sh '''
              cd Services/match
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/match-service:${image_tag} .
              docker push ${GCR_ID}/match-service:${image_tag}
            '''
          }
        }
      }
    }

    stage('Build Images Phase 2') {
      parallel {
        stage('Build Competition Image') {
          steps {
            sh '''
              cd Services/competition
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              # docker build -t ${GCR_ID}/competition-service:${image_tag} .
              # docker push ${GCR_ID}/competition-service:${image_tag}
            '''
          }
        }

        stage('Build Stadium Image') {
          steps {
            sh '''
              cd Services/stadium
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/stadium-service:${image_tag} .
              docker push ${GCR_ID}/stadium-service:${image_tag}
            '''
          }
        }

        stage('Build Technical Director Image') {
          steps {
            sh '''
              cd Services/technical_director
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/technical-director-service:${image_tag} .
              docker push ${GCR_ID}/technical-director-service:${image_tag}
            '''
          }
        }
      }
    }

    stage('Build Images Phase 3') {
      parallel {
        stage('Build Player Image') {
          steps {
            sh '''
              cd Services/player
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              # docker build -t ${GCR_ID}/player-service:${image_tag} .
              # docker push ${GCR_ID}/player-service:${image_tag}
            '''
          }
        }

        stage('Build Post Image') {
          steps {
            sh '''
              cd Services/post
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/post-service:${image_tag} .
              docker push ${GCR_ID}/post-service:${image_tag}
            '''
          }
        }

        stage('Build Auth Image') {
          steps {
            sh '''
              cd Services/auth
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/auth-service:${image_tag} .
              docker push ${GCR_ID}/auth-service:${image_tag}
            '''
          }
        }
      }
    }

    stage('Build Images Phase 4') {
      parallel {
        stage('Build Administrator Image') {
          steps {
            sh '''
              cd Services/administrator
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              # docker build -t ${GCR_ID}/administrator-service:${image_tag} .
              # docker push ${GCR_ID}/administrator-service:${image_tag}
            '''
          }
        }

        stage('Build Employee Image') {
          steps {
            sh '''
              cd Services/employee
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/employee-service:${image_tag} .
              docker push ${GCR_ID}/employee-service:${image_tag}
            '''
          }
        }

        stage('Build Country Image') {
          steps {
            sh '''
              cd Services/country
              rm -rf .env.production
              cp ${ENV_PRODUCTION} .env.production

              docker build -t ${GCR_ID}/country-service:${image_tag} .
              docker push ${GCR_ID}/country-service:${image_tag}
            '''
          }
        }
      }
    }

    stage('Build Frontend') {
      steps {
        sh '''
          cd Frontend
          docker build -t ${GCR_ID}/frontend-test:${image_tag} .
          docker push ${GCR_ID}/frontend-test:${image_tag}
        '''
      }
    }

    stage('Testing Infrastructure') {
      steps {
        script {
          sh '''
            export GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS}

            export TF_VAR_google_access="$(cat ${GOOGLE_APPLICATION_CREDENTIALS})"
            export TF_VAR_gcr_id=${GCR_ID}
            export TF_VAR_testing_ip=${TESTING_IP}
            export TF_VAR_frontend_image="frontend-test"

            cd Terraform/Testing

            terraform init -reconfigure
            terraform validate
            terraform apply -destroy -auto-approve
            terraform apply -auto-approve
          '''
        }
      }
    }
  }
}