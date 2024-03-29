# graphQLPlaceholder

## System Requirements
- [Latest LTS version of Node]("https://nodejs.org/en/download")
- [MySQL server]("https://dev.mysql.com/downloads/mysql/")

## Getting Started

You will need to have an instance of a MySQL server running on your local machine, start MySQL in your terminal with the command: 
```
mysql.server start
```
If you have cloned thos repo, to insatll all the packages run this command:
```
npm install OR npm i
```
To connect your MySQL server to your project, you will need to add a dotenv file to the root of the project, inside this file you will need to add the following: 
```
DATABASE_URL="mysql://{your username}:{your domain}:{your port number}/{name of your database}"
```
Note of the above: everything in curly braces must be replaced with your MySQL information without the curly braces.


After you have your MySQL server running, and have connected Prisma to your database, you can now migrate the prisma files with the following command:
```
npx prisma migrate dev 
```
Once you have migrated the files, you can now seed the database with this command: 
```
npx prisma db seed
```

If everything has worked you now are ready to start the app, use the following to do so:
```
npm start OR npm run dev
```

You should have the project running at: http://localhost:5000/graphql

This project was my first with graphql, and presented many challenges. I appreciate any feedback on this as I am still learning, thank you


## The graphiql GUI
In the docs portion of the GUI there are definitions to all the queries and mutations you can create, look in the top right of the screen. The root query is somewhat long but you can leave out any field you want. Check the docs for examples of the queris and mutations. 
### Created by:
Nick Adams

