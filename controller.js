require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize
          .query(
            `
                drop table if exists books;
            
                create table books (
                  book_id serial primary key, 
                  name varchar,
                  author varchar,
                  favorite Boolean
              );
    
                insert into books (name, author, favorite)
                    values ('The Hiding Place', 'Corrie Ten Boom', True),
                    ('Awakenings', 'Oliver Sacks', True),
                    ('Catch_22', 'Joseph Heller', False),
                    ('The Peter Principle', 'Lawrence J. Peter', False),
                    ('A Tale of Two Cities', 'Charles Dickens', False),
                    ('The Chosen', 'Chaim Potok', False),
                    ('A Tree Grows in Brooklyn', 'Betty Smith', True),
                    ('The Omnivore’s Dilemma', 'Michael Pollan', False),
                    ('Charlie and the Chocolate Factory', 'Roald Dahl', False),
                    ('Tom Sawyer', 'Mark Twain', False), 
                    ('Huckleberry Finn', 'Mark Twain', False), 
                    ('Grendel', 'John Gardner', False);  
            `
          )
          .then(() => {
            console.log("DB seeded!");
            res.sendStatus(200);
          })
          .catch((err) => console.log("error seeding DB", err));
    },

    getBooks: (req, res) => {
        const bookList = req.params.id
        sequelize.query(`select * from books`)
        .then(() => {
            res.send.data
            console.log("Selected All Books!");
            res.sendStatus(200);
        })
        .catch((err) => console.log("error getting all books", err));
    },

    getFavorites: (req, res) => {
        sequelize.query(`select from books
        where favorite = True`)
        .then(() => {
            res.send.data
            console.log("Selected Favorite Books!");
            res.sendStatus(200);
        })
        .catch((err) => console.log("error getting favorite books", err));
    },
    
    addBook: (req, res) => {
       const newName = req.body.name
       const newAuthor = req.body.author
       const newFavorite = req.body.favorite
       console.log(newName, newAuthor, newFavorite)
       sequelize.query(`
       insert into books (name, author, favorite)
       values  ('${newName}', ${newAuthor}, ${newFavorite})`)
       .then(() => {
            console.log("Book Added!");
            res.sendStatus(200)
        })
        .catch((err) => console.log("error adding book", err));
    },

    favoriteBook: (req, res) => {
        const favoriteBookID = req.params.id
        sequelize.query(`update books
        set favorite = True
        where book_id = ${favoriteBookID}`)
        .then(() => {
            console.log("Book Favorited!");
            res.sendStatus(200);
        })
        .catch((err) => console.log("error favoriting book", err));
    },

    deleteBook: (req, res) => {
        const deleteBookID = req.params.id
        console.log(deleteBookID)
        sequelize.query(`
        delete from books where book_id = ${deleteBookID}`)
        .then(() => {
            console.log("Book Deleted!");
            res.sendStatus(200);
        })
        .catch((err) => console.log("error deleting book", err));
    }
}