# API

### Dev: http://35.226.71.20:2091/appstatus

### Prod: http://35.222.183.8:2091/appstatus

## Setup

### Docker (optional)

Download Docker for Desktop here: https://www.docker.com/products/docker-desktop

### Node

Download and install Node v10.15.0: https://nodejs.org/en/download/

## How to get API running on your system

```
# Docker way
npm run docker:install

npm run docker:start

# Non-Docker way
npm i

npm start
```

## How to hit API with a request

```
# How to test pulling data from the database
curl -X GET http://localhost:2091/getData/1 -i

# Login successfully
curl -X POST http://localhost:2091/login -H 'Content-Type: application/json' -d '{ "email": "powells3@myumanitoba.ca", "password": "password" }' -i

# Login unsuccessfully
curl -X POST http://localhost:2091/login -H 'Content-Type: application/json' -d '{ "email": "powells3@myumanitoba.ca", "password": "wrong" }' -i

# Pull secure data as a logged in user
curl -X GET http://localhost:2091/getDataSecure/1 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNTQxMTg2MTEwfQ.w-aABAzyMEjaU0Gdbjy1M3dEbyY1Y3XR0A8zldzOSn8' -i

# Pull secure data without being logged in
curl -X GET http://localhost:2091/getDataSecure/1 -i

# Create a new message
curl -X POST http://localhost:2091/createMessage -H 'Content-Type: application/json' -d '{ "name": "Ang_test", "message_content": "hello world!" }' -i
```

## How to run tests

```
# Docker way
npm run docker:test

# Non-Docker way
npm test
```
