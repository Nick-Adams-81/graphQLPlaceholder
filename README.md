# graphQLPlaceholder

## System Requirements
- [Latest LTS version of Node]("https://nodejs.org/en/download")
- [MySQL server]("https://dev.mysql.com/downloads/mysql/")

## Getting Started

You will need to have an instance of a MySQL server running on your local machine, start MySQL in your terminal with the command: 
```
mysql.server start
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

