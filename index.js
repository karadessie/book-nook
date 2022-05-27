require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const {seed, bookCount, addBook, favoriteBook, deleteBook} = require('./controller.js');
const req = require('express/lib/request');

app.use(cors());
app.use(express.json()); 

function handleSubmit (e) {
	e.preventDufault()

}

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

app.get("/api/featured", (req, res) => {
	const bookNames = ["The Hiding Place", "Awakenings", "Catch_22",
		"The Peter Principle", "A Tale of Two Cities", "The Chosen", "A Tree Grows in Brooklyn",
		"The Omnivore's Dilemma", "Charlie and the Chocolate Factory", "Tom Sawyer", "Huckleberry Finn", "Grendel"]
	let randomIndex = Math.floor(Math.random() * bookNames.length);
	let randomBook = bookNames[randomIndex];
  
	res.status(200).send(randomBook);    
  });

app.post('/seed', seed)
app.get('/api/books', bookCount);
app.post('/api/books', addBook);
app.put('/api/books/:id', favoriteBook);
app.delete('/api/books/:id', deleteBook);

app.listen(process.env.SERVER_PORT, () => console.log(`up on 4000`))