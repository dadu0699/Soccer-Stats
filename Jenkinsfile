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

    stage('Test On Customer Service') {
      when { changeset "Services/customer/**"}
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
      when { changeset "Services/team/**"}
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
      when { changeset "Services/match/**"}
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

    stage('Test On Competition Service') {
      when { changeset "Services/competition/**"}
      steps {
        sh '''
          cd Services/competition
          rm -rf .env.test
          cp ${ENV_TEST} .env.test

          npm install
          npm run test
        '''
      }
    }

    stage('Test On Stadium Service') {
      when { changeset "Services/stadium/**"}
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
      when { changeset "Services/technical_director/**"}
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

    stage('Test On Player Service') {
      when { changeset "Services/player/**"}
      steps {
        sh '''
          cd Services/player
          rm -rf .env.test
          cp ${ENV_TEST} .env.test

          npm install
          npm run test
        '''
      }
    }

    stage('Test On Post Service') {
      when { changeset "Services/post/**"}
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
      when { changeset "Services/auth/**"}
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

    stage('Test On Administrator Service') {
      when { changeset "Services/administrator/**"}
      steps {
        sh '''
          cd Services/administrator
          rm -rf .env.test
          cp ${ENV_TEST} .env.test

          npm install
          npm run test
        '''
      }
    }

    stage('Test On Employee Service') {
      when { changeset "Services/employee/**"}
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
      when { changeset "Services/country/**"}
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

    stage('Build Customer Image') {
      when { changeset "Services/customer/**"}
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
      when { changeset "Services/team/**"}
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
      when { changeset "Services/match/**"}
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

    stage('Build Competition Image') {
      when { changeset "Services/competition/**"}
      steps {
        sh '''
          cd Services/competition
          rm -rf .env.production
          cp ${ENV_PRODUCTION} .env.production

          docker build -t ${GCR_ID}/competition-service:${image_tag} .
          docker push ${GCR_ID}/competition-service:${image_tag}
        '''
      }
    }

    stage('Build Stadium Image') {
      when { changeset "Services/stadium/**"}
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
      when { changeset "Services/technical_director/**"}
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

    stage('Build Player Image') {
      when { changeset "Services/player/**"}
      steps {
        sh '''
          cd Services/player
          rm -rf .env.production
          cp ${ENV_PRODUCTION} .env.production

          docker build -t ${GCR_ID}/player-service:${image_tag} .
          docker push ${GCR_ID}/player-service:${image_tag}
        '''
      }
    }

    stage('Build Post Image') {
      when { changeset "Services/post/**"}
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
      when { changeset "Services/auth/**"}
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

    stage('Build Administrator Image') {
      when { changeset "Services/administrator/**"}
      steps {
        sh '''
          cd Services/administrator
          rm -rf .env.production
          cp ${ENV_PRODUCTION} .env.production

          docker build -t ${GCR_ID}/administrator-service:${image_tag} .
          docker push ${GCR_ID}/administrator-service:${image_tag}
        '''
      }
    }

    stage('Build Employee Image') {
      when { changeset "Services/employee/**"}
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
      when { changeset "Services/country/**"}
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

    stage('Build Frontend Test-Image') {
      when { changeset "Frontend/**"}
      steps {
        sh '''
          cd Frontend
          docker build -t ${GCR_ID}/frontend-test:${image_tag} --file Dockerfile-Testing .
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

    stage('Testing Frontend') {
      when { changeset "Frontend/**"}
      steps {
        sh 'echo "Testing Frontend"'
      }
    }

    stage('Build Frontend Image') {
      when { changeset "Frontend/**"}
      steps {
        sh '''
          cd Frontend
          docker build -t ${GCR_ID}/frontend:${image_tag} .
          docker push ${GCR_ID}/frontend:${image_tag}
        '''
      }
    }

    stage('Production Infrastructure') {
      steps {
        script {
          sh '''
            export GOOGLE_APPLICATION_CREDENTIALS=${GOOGLE_APPLICATION_CREDENTIALS}

            export TF_VAR_google_access="$(cat ${GOOGLE_APPLICATION_CREDENTIALS})"
            export TF_VAR_gcr_id=${GCR_ID}
            export TF_VAR_production_ip=${PRODUCTION_IP}
            export TF_VAR_frontend_image="frontend"

            cd Terraform/Production

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