pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        // Install Node.js dependencies for the backend
        dir('blogger/API') {
          sh 'npm install'
        }
        // Install Node.js dependencies for the frontend
        dir('blogger/client') {
          sh 'npm install'
        }
        // Build the backend
        dir('blogger/API') {
          sh 'npm run build'
        }
        // Build the frontend
        dir('blogger/client') {
          sh 'npm run build'
        }
      }
    }
    stage('Deploy') {
      steps {
        // Deploy the backend to a server or a cloud provider
        dir('blogger/API') {
          sh 'npm run deploy'
        }
        // Deploy the frontend to a server or a cloud provider
        dir('blogger/client') {
          sh 'npm run deploy'
        }
      }
    }
  }
}
