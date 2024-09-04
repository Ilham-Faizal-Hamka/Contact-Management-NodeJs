# Contact API Specification

## Create Contact API
Endpoint : POST /api/contacts

Header :
- Autorization : token

Request Body : 
```json
{
    "first_name" : "Nurberkah",
    "last_name" : "Tania",
    "email" : "faizalswife@love.com", 
    "phone" : "081232141413"
}
```

Response Body Success : 
```json
{
    "id" : "unique-id",
    "first_name" : "Nurberkah",
    "last_name" : "Tania",
    "email" : "faizalswife@love.com", 
    "phone" : "081232141413"
}
```

Response Body Error :
```json
{
    "error" : "email is not valid"
}
```

## Update Contact API
Endpoint : PUT /api/contacts/:contactId

Header :
- Autorization : token

Response Body Success : 
```json
{
    "id" : "unique-id",
    "first_name" : "Nurberkah",
    "last_name" : "Tania sayang",
    "email" : "faizalsbelovedwife@love.com", 
    "phone" : "081232141413"
}
```

Response Body Error :
```json
{
    "error" : "email is not valid"
}
```

## Get Contact API
Endpoint : GET /api/contacts/:id

Header :
- Autorization : token

Response Body Success : 
```json
{
    "id" : "unique-id",
    "first_name" : "Nurberkah",
    "last_name" : "Tania sayang",
    "email" : "faizalsbelovedwife@love.com", 
    "phone" : "081232141413"
}
```

Response Body Error :
```json
{
    "error" : "Contact is not found"
}
```

## Search Contact API
Endpoint : GET /api/contacts/

Header :
- Autorization : token

Query Params : 
- name : Search by first_name or last_name, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1 
- size : size per page, default 10 

Response Body Success : 
```json
{
    "data" : [
        {
            "id" : "unique-id",
            "first_name" : "Nurberkah",
            "last_name" : "Tania sayang",
            "email" : "faizalsbelovedwife@love.com", 
            "phone" : "081232141413"
        },
        {
            "id" : "unique-id",
            "first_name" : "Tania",
            "last_name" : "istriku",
            "email" : "mywife@love.com", 
            "phone" : "081232141413"
        }
    ],
    "paging" : {
        "page" : 1,
        "total_page" : 2,
        "total_item" : 30
    }
}
```


## Delete Contact API
Endpoint : DELETE /api/contacts/:id

Header :
- Autorization : token

Response Body Success : 
```json
{
    "data" : "contact deleted"
}
```

Response Body Error :
```json
{
    "error" : "Contact is not found"
}
```