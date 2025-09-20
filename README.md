Install Node > Download PostgreSQL > import FPCPDB.json in PgAdmin

Start Node and Server
cd ...my-app/client (frontend)
npm run dev

cd ...my-app/server (backend)
node server.js


****Install Node.js****
Download and install from nodejs.org: https://nodejs.org/en

Check version:
node -v
npm -v


**Create a React app**
There are two common ways: Vite (faster) or Create React App (classic).
Vite is used for the project

npm create vite@latest my-app

Then choose:

Framework: React

Variant: JavaScript

**Go into the project**
cd my-app
npm install

**Run the dev server**
npm run dev

It will give you a local URL like:
👉 http://localhost:5173

**Open in your editor**

Open the my-app folder in VS Code (or your editor). Your entry file will be src/App.jsx.

****Setup backend****
No need as it is existing in the folder already
Just for introduction's sake, here is the setup for the backend

**Create a backend folder**
Inside your project root (same level as your React app), make a folder for the backend:

mkdir server
cd server

**Initialize Node project**
npm init -y

This creates a package.json.

**Install Express**
npm install express cors dotenv

express → web framework

cors → allow frontend to call backend

dotenv → manage environment variables (like DB connection, secrets)

**Create server.js**
Inside server/, create server.js:

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend 👋" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

**Update package.json**

Enable ES modules (so you can use import instead of require).
In package.json, add:

"type": "module"

**Run the server**
node server.js


✅ You should see:

✅ Server running on http://localhost:5000


Now if you go to http://localhost:5000/api/hello
, you’ll see:

{ "message": "Hello from Express backend 👋" }

**Connect React → Express**
From your React frontend (Vite app), you can fetch data like:

useEffect(() => {
  fetch("http://localhost:5000/api/hello")
    .then(res => res.json())
    .then(data => console.log(data));
}, []);

****Database Setup****
Only thing need is to install and setup PostgreSQL 
but for reference, here is the whole setup

**Install PostgreSQL locally**

Download & install from https://www.postgresql.org/download/

During setup, note down:

username (default: **postgres**)

password: **admin**

port (default: **5432**)

You can use pgAdmin or the command line (psql) to manage your DB.

**Install pg package** You can stop here and proceed with starting the node and server

Inside your backend (server/):

npm install pg

**Create .env**

In your server/ folder, create a .env file to store DB credentials:

PGUSER=postgres
PGPASSWORD=yourpassword
PGHOST=localhost
PGPORT=5432
PGDATABASE=mydb

**Connect in db.js**

Inside server/db/, make a db.js:

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

export default pool;

**Example query in server.js**

Update server.js to use PostgreSQL:

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample route: get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Sample route: insert user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);

**Create a test table in PostgreSQL**

In psql or pgAdmin, run:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

**Test**

Start your backend:

node server.js


Try GET http://localhost:5000/api/users → should return [] (empty).

Try POST http://localhost:5000/api/users with JSON body:

{ "name": "Alice", "email": "alice@example.com" }


Then GET again → should return your user. 🎉

****Import FPCPDB.json in PgAdmin****
