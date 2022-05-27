require('dotenv').config();
const { response } = require('express');
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
                  name varchar not null,
                  author varchar,
                  favorite Boolean
              );
    
                insert into books (name, author, favorite)
                    values ('The Hiding Place', 'Corrie Ten Boom', true),
                    ('Awakenings', 'Oliver Sacks', true),
                    ('Catch_22', 'Joseph Heller', false),
                    ('The Peter Principle', 'Lawrence J. Peter', false),
                    ('A Tale of Two Cities', 'Charles Dickens', false),
                    ('The Chosen', 'Chaim Potok', false),
                    ('A Tree Grows in Brooklyn', 'Betty Smith', true),
                    ('The Omnivore’s Dilemma', 'Michael Pollan', false),
                    ('Charlie and the Chocolate Factory', 'Roald Dahl', false),
                    ('Tom Sawyer', 'Mark Twain', false), 
                    ('Huckleberry Finn', 'Mark Twain', false), 
                    ('Grendel', 'John Gardner', false);  
            `
          )
          .then(() => {
            console.log("DB seeded!");
            res.sendStatus(200);
          })
          .catch((err) => console.log("error seeding DB", err));
    },

    bookCount: (req, res) => {
         sequelize.query(`select name from books
         where name is not null`, { plain: false })
        .then(result =>  {
            console.log(result)
            res.status(200).send(result[0])
        })
        .catch((err) => console.log("error counting books", err));
    },
    
    addBook: (req, res) => {
       const newName = req.body.name
       const newAuthor = req.body.author
       const newFavorite = req.body.favorite
       console.log(newName, newAuthor, newFavorite)
       sequelize.query(`
       insert into books (name, author, favorite)
       values  ('${newName}', '${newAuthor}', ${newFavorite})`)
       .then(() => {
            console.log("Book Added!");
            res.sendStatus(200)
        })
        .catch((err) => console.log("error adding book", err));
    },

    favoriteBook: (req, res) => {
        const favoriteBookName = req.params.id
        sequelize.query(`update books
        set favorite = true
        where name = '${favoriteBookName}'`)
        .then(() => {
            console.log("Book Favorited!");
            res.sendStatus(200);
        })
        .catch((err) => console.log("error favoriting book", err));
    },

    deleteBook: (req, res) => {
        const deleteBookName = req.params.id
        console.log(deleteBookName)
        sequelize.query(`
        delete from books where name = '${deleteBookName}'`)
        .then(() => {
            console.log("Book Deleted!");
            res.sendStatus(200);
        })
        .catch((err) => console.log("error deleting book", err));
    }
}