# Shopping cart example


# Backend API

- node version  14  or less,  see https://stackoverflow.com/questions/66420890/open-api-error-request-should-have-required-property-headers-docker
- Move to the target directory: ```cd backend```

## Using this API - Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file


# Frontend:  cart UI, react APP

- Move to the target directory: ```cd frontend```


## Using this app - Quick Start

Get started developing...

```shell
# install deps
yarn

# run in development mode
yarn start

# run tests
yarn test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
yarn
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
yarn start
```


#### Run in *production* mode:

Compiles the application and starts it in production mode.

```shell
yarn build
serve -s build
```

## Test It

Run the Jest unit tests

```shell
yarn test
```

