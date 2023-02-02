pipeline {

  agent any

  stages {

    stage('Checking Docker Version') {
      steps {
        sh 'id'
        sh 'docker-compose version'
        sh 'docker version'
        echo 'Removing Existing Application'
        sh 'docker compose down'
      }
    }
    stage("installing Wordpress with Docker Compose") {
      steps {
        echo "installing Wordpress with Docker Compose"
        sh 'docker-compose up -d'
        sh 'pwd; ls -al; sleep 10'
      }
    }
    stage("Get the Application logs") {
      steps {
        sh 'docker-compose logs certbot'
        sh 'docker-compose logs webserver'
        sh 'docker-compose logs wordpress'
        sh 'docker-compose logs db'
        sh 'docker-compose ps'
      }
    }
  }
}