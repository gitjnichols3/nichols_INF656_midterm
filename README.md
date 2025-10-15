Express.js application that demonstrates my understanding of servers, routing, middleware, MVC organization, and CRUD operations. 

Run the server by running app.js. I used nodemon app.js command from the terminal in VSCode.

What each endpoint does:
- GET http://localhost:3000/items - returns all items from model/items.json
- GET http://localhost:3000/items/4 - returns a specific item. In this example, item 4.
- POST http://localhost:3000/items with the following body -
    {
      "name": "Dining Table",
      "category": "Kitchen",
      "price": 400
    }
    - Creates a new record in model/items.json using the next available id number, in this case 11
- PUT http://localhost:3000/items/11 with the following body -
    {
      "id": 11,
      "name": "Large Dining Table",
      "category": "Kitchen",
      "price": 1000
    }
    - Updates record 11 in model/items.json with a new name and price value.
- DELETE http://localhost:3000/items/11 with the following body -
    {
      "id": 11
    }
    - Deletes record 11 from model/items.json.
 
Examples of each opertation run in Thunder Client, including an example 404 error, are shown in labelled screenshot files in the screenshots folder within the repository.

