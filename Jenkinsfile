pipeline {

  agent any

  stages {

    stage("installing Wordpress with Docker Compose") {
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
        sh 'docker-compose ps';
      }
    }
  }
}