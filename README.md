# DockerMon - Docker Container Monitor and Reports

This is a project for Docker Monitoring

It's built with a NodeJS / Express backend and an Angular 12 frontend using PrimeNG.

## Development Server

You have several options to run and build this server.

If not using Docker, install required node modules:

```
npm install
```

### Option 1 - Local Development

To run the backend separately:

```
npm run-script dev
```

This option runs the backend without building Angular frontend. Runs a node server using nodemon to watch for file changes and restarts node for the api at: `http://localhost:3005`

To run the Angular front end with live reload, in a separate terminal:

```
ng serve
```

This runs angular server at `http://localhost:4200/`. The app will automatically reload if you change any of the source files in `/src/app`.

### Option 2 - Local Backend With Angular Build

To run both Angular Frontend / Node Backend with nodemon and live reload:

```
npm run-script startlocal
```

This option runs the backend using nodemon to restart on file changes also and runs `ng build --watch` Front end and backend are found at: `http://localhost:3005`

## Docker Container

To build a docker container and run the node app, run:

```
docker-compose -f docker-compose.yml up
```

To update any system changes to docker run:

```
docker-compose -f docker-compose.yml up --build
```

> Changes made in VS Code are (eventually) updated in Docker because the container runs both nodemon and ng build --watch.

Access docker container on `http://localhost:3005`
