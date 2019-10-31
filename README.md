# express-passport-sessions

## What is this project?
* Sample application of a **Passport JS** authentication system.
* It includes: login/logout, sessions and a MySQL session store for persistent logged in status.
* It contains only 3 barebones pages (Homepage, Login and Register).
* You can only access the homepage if you're logged in... otherwise you're redirected to the login page.
* There is a test database included with a users and sessions tables and a single row of data in the users table... just for testing.
* It includes the npm dependencies: **bcrypt** (for hashing and comparing plain text passwords), **dotenv** (for managing environmental variables), **express** (the server this project uses), **express-mysql-session** (for managing the MySQL session store), **express-session** (for managing Passport's sessions), **if-env** (used to check to see if certain environemntal variables are present), **mysql2** (the database driver), **passport** (the main authentication package), **passport-local** (for utilizing Passport's local strategy).
* Several devDependencies are installed... mostly for linting.
* The linting files (**.eslintrc.json** and **.eslintignore**) are configured with my base set of rules. They include some react linting packages/rules that are part of my normal react linting, but aren't relevant to this project.
* The **config/connection.js** and **config/sessionStore.js** connection info is setup to use Heroku's **JAWDB_URL** (if it's present) or the local **.env** (if it's not).

## How can you get started using this project?
1. Clone this repo onto your local computer:
```
git clone git@github.com:mike14747/express-passport-sessions.git
```
2. Create a **.env** file in the root folder with the following content:
 ```
PORT=3000
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
5. **Note:** if you use this project on a remote server, you'll have to edit the connection info in: **config/connection.js** and **config/sessionStore.js** and add the **SESSION_SECRET** to that server's environmental variables manually.

## This project was created and is maintained by:

* Mike Gullo
* Working version of this project: https://express-passport-sessions.herokuapp.com
* This project's github repo: https://github.com/mike14747/express-passport-sessions
* Me on github: https://github.com/mike14747
* Contact me at: mike14747@oh.rr.com for more info about this project.