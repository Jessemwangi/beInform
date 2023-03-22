pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        // Install Node.js dependencies for the backend
        dir('blogger/API') {
          sh '/opt/homebrew/bin/npm install'
        }
        // Install Node.js dependencies for the frontend
        dir('blogger/client') {
          sh '/opt/homebrew/bin/npm install'
        }
      }
    }
    stage('Deploy') {
      steps {
        // Build the backend and frontend
        dir('blogger/API') {
          sh '/opt/homebrew/bin/npm run build'
        }
        dir('blogger/client') {
          sh '/opt/homebrew/bin/npm run build'
        }
        // Deploy the backend to a server or a cloud provider
        dir('blogger/API') {
          sh '/opt/homebrew/bin/npm run deploy'
        }
        // Deploy the frontend to a server or a cloud provider
        dir('blogger/client') {
          sh '/opt/homebrew/bin/npm run deploy'
        }
      }
    }
  }
}
