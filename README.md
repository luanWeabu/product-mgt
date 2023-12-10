# Backend (be):

Create a `.env` file in the root of `be` folder with the following structure:

```
//config env database backend
DB_HOST=<your database host>
DB_USER=<your database user>
DB_PASSWORD=<your database password>
DB_DATABASE=<your database name>

// Default frontend origin
CORS_ORIGIN=http://localhost:3000

//Token secret
ACCESS_TOKEN_SECRET=<access_token_secret>
REFRESH_TOKEN_SECRET=<resfresh_token>
```

Examples:

```
//config env database backend
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_DATABASE=product_mgt_db

// Default frontend origin
CORS_ORIGIN=http://localhost:3000

//Token secret
ACCESS_TOKEN_SECRET=abc_access_token_sec
REFRESH_TOKEN_SECRET=abc_refresh_token_sec
```

Run the project

```
npm run dev
```

# Frontend (fe):

Create a `.env` file in the root of `fe` folder file with the following structure:

```
// Backend base url, default is http://localhost:5000
REACT_APP_BASE_API_URL=<Backend base url>
```

Run the project

```
npm run start
```

# Data preparation

1. Register a user

2. Login with the created user

3. Try all CRUD product features, you can start with create some products.
