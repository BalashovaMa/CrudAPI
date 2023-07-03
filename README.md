# crud-api

### How to instal

    git clone https://github.com/BalashovaMa/CrudAPI.git
    git checkout dev
    npm i

### How to run

#### Dev mode

    npm run start:dev

#### Prod mode

    npm run start:prod

#### Tests

    npm test

## Api

### http://localhost:3000 - base url

### "/api/users" - end point

Methods:

"GET" - get all users

"POST" - create new user (all fields mandatory)

{ "username": string!,

"age": number!,

"hobbies": string[]!}


### "/api/users/{uuid} - end point

Methods:

"Get" - get user by uuid

"PUT" - update user info by uuid (all fields mandatory)

{ "username": string!,

"age": number!,

"hobbies": string[]!}


"DELETE" - delete user by uuid
