# User API Specification

## Register User API
Endpoint : POST /api/users

Request Body :
```json
    {
        "username" : "faizalhamka45",
        "password" : "password",
        "name" : "ilham faizal hamka"
    }
```

Response Body Success : 
```json
{
    "data": {
        "username" : "faizalhamka45",
        "name" : "ilham faizal hamka"
    }
}
```

Response Body Error : 
```json
{
    "error": {
        "message" : "username already registered"
    }
}
```

## Login User API
Endpoint : POST /api/users/login

Request Body :
```json
    {
        "username" : "faizalhamka45",
        "password" : "password"
    }
```

Response Body Success : 
```json
{
    "data": {
        "token" : "unique-token"
    }
}
```

Response Body Error : 
```json
{
    "error": {
        "message" : "username or password wrong"
    }
}
```

## Update User API
Endpoint : PATCH /api/users/:id
<!-- kalo pake PUT itu nanti di timpa -->
<!-- sedangkan kita cuma pengen ubah sebagain aja atau parsial data  -->

Headers : 
- Authorization : token

Request Body :
```json
    {
        "password" : "newpassword123", //opsional
        "name" : "ilham faizal hamka ganteng" //opsional
    }
```

Response Body Success : 
```json
{
    "data": {
        "username" : "faizalhamka45",
        "name" : "ilham faizal hamka ganteng"
    }
}
```

Response Body Error : 
```json
{
    "error": {
        "message" : "Unauthorized"
    }
}
```

## Get User API
Endpoint : GET /api/users/:id

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data": {
        "username" : "faizalhamka45",
        "name" : "ilham faizal hamka ganteng"
    }
}
```

Response Body Error : 
```json
{
    "error": {
        "message" : "Unauthorized"
    }
}
```

## Logout User API
Endpoint : DELETE /api/users/logout

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data": {
        "message" : "logout success"
    }
}
```

Response Body Error : 
```json
{
    "error": {
        "message" : "Unauthorized"
    }
}
```