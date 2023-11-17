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


# DAPPS:
The DAPPS showcase menu in the Dashboard offers a feature to display various dApps available on the Cudos network. The Dashboard is designed to support the display of the following Cudos related dApps:

   - explorer (handled internally)
   - osmosis (handled internally)
   - multisend
   - multisig
   - bridge
   - tokenminter
   - allowlist
   - cudovenger
 
 The "explorer" and "osmosis" are integrated and managed internally. Other dApps can be added and configured through the .env file. When adding dApps in the .env file, use the dApp name as the key and the corresponding URL as the value.

## Format for .env Configuration:
Each dApp should be represented as a valid JSON object in an object wrapper. The key should be the dApp name (e.g., "multisend"), and the value should be the the object containing the URL where the dApp is accessible (e.g., "http://1.2.3.4:1234").

Example Configuration in .env:
   ```
   VITE_APP_DAPPS='{"multisend":{"url":"http://1.2.3.4:1234"},"multisig":{"url":"http://1.2.3.4:1234"},"bridge":{"url":"http://1.2.3.4:1234"},"ThisWontBeDisplayed":{"url":"http://1.2.3.4:1234"}}'
   ```

## Note:
The entire VITE_APP_DAPPS variable value should be a single string.
Ensure there are no whitespaces within the string.