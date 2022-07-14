# CUDOS Dashboard

## Install the dependencies

```bash
yarn install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

### Build the app for production

```bash
yarn build
```

### Preview the built app

```bash
yarn preview
```

## Deployment

1. Make sure you have **Docker 20.10** or above installed
2. Navigate to the project folder
3. `git pull` on the **main** branch to get the latest changes
4. Build the Docker image
   `docker build -t 'cudos-dashboard' . --no-cache`
5. Run the image
   `docker run -d -p 3060:80 cudos-dashboard`
