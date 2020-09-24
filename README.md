# express-passport-sessions

## What is this project?
* Sample application of a **Passport JS** authentication system.
* It includes: login/logout, local strategy, sessions and a MySQL session store for persistent logged in status.
* It contains only 3 barebones pages (Homepage, Login and Register).
* You can only access the homepage if you're logged in... otherwise you're redirected to the login page.
* There isn't any input validation on the register page's input fields, but the controller will only accept username and password lengths of 6 or greater.
* There is a test database included with a users and sessions tables and a single row of data in the users table... just for testing.
* It includes the npm dependencies: **bcrypt** (for hashing and comparing plain text passwords), **dotenv** (for managing environmental variables), **express** (the server this project uses), **express-mysql-session** (for managing the MySQL session store), **express-session** (for managing Passport's sessions), **if-env** (provides the ability to use conditional statements in package.json), **mysql2** (the database driver), **passport** (the main authentication package), **passport-local** (for utilizing Passport's local strategy).
* Several devDependencies are installed... mostly for linting.
* The linting files (**.eslintrc.json** and **.eslintignore**) are configured with my base set of rules. They include some react linting packages/rules that are part of my normal react linting, but aren't relevant to this project.
* The **config/connection.js** connection info is setup to use Heroku's **JAWDB_URL** (if it's present) or the local **.env** (if it's not).

## What problems were encountered and solved in this project?
I was having a problem in the **config/connection.js** file in trying to figure out how to set: **multipleStatements: true** in the production version of this app. No, I didn't need to use multiple statements in any of the basic queries in this app, but I often do like to do multiple statement queries (eg: when setting MySQL variables) and I was just curious as to how to enable them on Heroku.
```
if (process.env.JAWSDB_URL) {
    const connection = mysql.createConnection(process.env.JAWSDB_URL);
} else { local db connection object }
```
It's easy to add a property to the else condition (dev build), but how to add that property to the production build, where **process.env.JAWSDB_URL** is a string. That's when I learned about decontstructing that string. I did it like this:
```
if (process.env.JAWSDB_URL) {
    const url = new URL(process.env.JAWSDB_URL);
    connection = mysql.createConnection({
        host: url.hostname,
        port: url.port,
        user: url.username,
        password: url.password,
        database: url.pathname.replace('/', ''),
        multipleStatements: true,
    });
} else { local db connection object }
```
Because, the **process.env.JAWSDB_URL** string is just this: **mysql://[username]:[password]@[hostname]:[port][/pathname]**

I had used Passport JS before, but this time around I wanted to gain a deeper understanding of how it works. 

## How can you get started using this project?
1. Clone this repo onto your local computer:
```
git clone git@github.com:mike14747/express-passport-sessions.git
```
2. Create a **.env** file in the root folder with the following content:
 ```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PW=<your-mysql-password>
DB_NAME=testDB
SESSION_SECRET=<your-session-secret>
```
3. Install the npm packages. From the root directory, run:
```
yarn install
```
4. Install the test database by using the schema and seeds files (**config/schema.sql** and **config/seeds.sql**).

## This project was created and is maintained by:

* Mike Gullo
* Working version of this project: https://express-passport-sessions.herokuapp.com
* This project's github repo: https://github.com/mike14747/express-passport-sessions
* Me on github: https://github.com/mike14747
* Contact me at: mike14747@oh.rr.com for more info about this project.