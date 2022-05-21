require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const {seed, getBooks, getFavorites, addBook, favoriteBook, deleteBook} = require('./controller.js');

app.use(cors());
app.use(express.json()); 

app.get("/api/quote", (req, res) => {
  const quotes = ["I do believe something very magical can happen when you read a good book... J.K. Rowling",
  	"He that loves reading has everything within his reach... William Goodwin",
  	"To read is to voyage through time... Carl Sagan",
  	"If you are going to get anywhere in life you have to read a lot of books... Roald Dahl",
  	"Buying a book is not about obtaining a possession… but about securing a portal... Laura Miller",
  	"Books are a uniquely portable magic... Stephen King",
  	"Reading stays with you until the very end, after Narnia is gone, Lord Voldemort is dead, and Alice is awake... Anonymous"]
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];

  res.status(200).send(randomQuote);    
});

app.post('/seed', seed)
app.get('/books', getBooks);
app.get('/books', getFavorites);
app.post('/books', addBook)
app.put('/books/:book_id', favoriteBook)
app.delete('/books/:book_id', deleteBook)

app.listen(process.env.SERVER_PORT, () => console.log(`up on 4000`))