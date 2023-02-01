pipeline {

  agent any

  stages {

    stage('Deploy WordPress') {
      steps {
        echo "installing Wordpress"
        sh 'id'
        // sh 'sudo chmod +x ./launcher; ./launcher bootstrap app'
        // sh 'docker-compose down'
        // sh 'docker rm $(docker ps -aq) -f'
        sh 'docker-compose version'
        sh 'docker version'
        sh 'docker-compose up -d'
        // sh 'docker-compose ps';
      }
    }
    stage('Deploy Nexus Repository') {
      steps {
        echo "installing Nexus Repository"
        // sh 'docker-compose down'
        // sh 'docker rm $(docker ps -aq) -f'
        // sh 'docker-compose up -d'
        // sh 'docker-compose ps';
      }
    }
  }
}