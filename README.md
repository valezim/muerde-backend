# muerde-backend

Muerde Backend Application.


## Run app on dev

### 1. Install dependencies (only first time)

```
npm install
```

### 2. Add .env file on root with the following: (only first time)

```
SERVER_PORT={port to run the server with}
DATABASE_URL={URL to connect to database}
```

### 3. Generate prisma client (only first time)

```
npx prisma generate
```

### 4. Push DB model into Database (only first time)

```
npx prisma db push
```

### 5. Run the app

```
npm run dev
```