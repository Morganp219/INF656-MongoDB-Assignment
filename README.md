
# Rest API FHSU Midterm

## Setup / Run Project

### Start Project
```
npm run setuprun
```
Installs and Runs App.js

### Start Nodemon (Dev) Project
```
npm run setupdev
```
Installs and Runs nodemon app.js

### Manual Setup
Install Node Packages
```
npm i
```
then run the project
```
node app.js
```

GET - /api/items >> Get All Items
Returns
```
[
    {
        "id": _xdfgtyuio90pikjhg,
        "name": "Item 17",
        "category": "Fruit",
        "price": 2.48
    },
    ...
]
```
GET - /api/items/:id >> Get Item by Identification
Returns
```

    {
        "id": _xdfgtyuio90pikjhg,
        "name": "Item 17",
        "category": "Fruit",
        "price": 2.48
    }

```
POST - /api/items/ >> Create new Item
Body
```
{
    "name": "Item 6",
    "category": "Fruit",
    "price": 2.48
}

```
Returns
```
{
    "id": _xdfgtyuio90pikjhg,
    "name": "Item 6",
    "category": "Fruit",
    "price": 2.48
}
```
PATCH - /api/items/:id >> Update an Item by Identification - Name, Category, and Price are optional
Body
```
{
    "name": "Item 1",
}

```
Returns
```
{
    "id": _xdfgtyuio90pikjhg,
    "name": "Item 1",
    "category": "Fruit",
    "price": 2.48
}
```
DELETE - /api/items/:id >> Delete Item by Identification