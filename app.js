const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
const logger = require('./middleware/logger');
const  { notFound, errorHandler }  = require('./middleware/errorHandler.js');



// custom middleware logger
app.use(logger); 

// Cross Origin Resource Sharing
app.use(cors()); 

// replaced by root.js
/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
}); */

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes?
// I was confused about the difference between routes/itemRoutes.js and routes/api/items.js in the instructions.
// I emailed for clarification on 10/13 and did not receive a response, so I implemented both routes although redundant.
app.use('/items', require('./routes/api/items'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/', require('./routes/root'));


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

