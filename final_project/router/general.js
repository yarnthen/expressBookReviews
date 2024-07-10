const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!isValid(username)){
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
    }else{
        return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Something wrong happened." });
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const booklistCall = new Promise((resolve, reject) => {       //this is part of task 10
    try {                                                       //this is part of task 10
        const data = res.send(JSON.stringify(books,null,4));    //const data = is part of task 10
        resolve(data);                                          //this is part of task 10
    } catch(err){                                               //this is part of task 10
        reject(err);                                            //this is part of task 10
    }                                                           //this is part of task 10
  });                                                           //this is part of task 10
  
    // Handling the resolved and rejected states of the promise
    booklistCall.then(                                             //this is part of task 10
    // Logging the file data if the promise is resolved             
    (data) => console.log(data),                                  //this is part of task 10
    // Logging an error message if the promise is rejected
    (err) => console.log("Something is holding up the transaction.")//this is part of task 10
    );


  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const bookdetailsCall = new Promise((resolve, reject) => {        //this is part of task 11
    try {                                                           //this is part of task 11
        const data1 = res.send(books[req.params.isbn]);             //const data1 = is part of task 11
        resolve(data);                                              //this is part of task 11
    } catch(err){                                                   //this is part of task 11
        reject(err);                                                //this is part of task 11
    }                                                               //this is part of task 11
  });                                                               //this is part of task 11

  // Handling the resolved and rejected states of the promise
  bookdetailsCall.then(                                             //this is part of task 11
    // Logging the file data if the promise is resolved             
    (data1) => console.log(data1),                                  //this is part of task 11
    // Logging an error message if the promise is rejected
    (err) => console.log("Something is holding up the transaction.")//this is part of task 11
    );


  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const author = req.params.author;
    const matchingBooks = [];

    // Iterate through the keys of the 'books' object
    for (const key of Object.keys(books)) {
        if (books.hasOwnProperty(key) && books[key].author === author) {
            matchingBooks.push(books[key]);
        }
    }
    if (matchingBooks.length > 0) {
        // Send the matching books
        const bookdetailsbasedonauthorCall = new Promise((resolve, reject) => {         //this is part of task 12
            try {                                                                       //this is part of task 12
                const data2 = res.send(matchingBooks);                                  //const data2 = is part of task 12
                resolve(data2);                                                          //this is part of task 12
            } catch(err){                                                               //this is part of task 12
                reject(err);                                                            //this is part of task 12
            }                                                                           //this is part of task 12
          });                                                                           //this is part of task 12
        // Handling the resolved and rejected states of the promise
        bookdetailsbasedonauthorCall.then(                                              //this is part of task 12
            // Logging the file data if the promise is resolved             
            (data2) => console.log(data2),                                              //this is part of task 12
            // Logging an error message if the promise is rejected
            (err) => console.log("Something is holding up the transaction.")            //this is part of task 12
        );
//return res.status(300).json({message: "Yet to be implemented"});
    } else {
        // No matching books found
        return res.status(300).json({ message: "Book not found" });
    }


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const title = req.params.title;
    const matchingBooks = [];

    // Iterate through the keys of the 'books' object
    for (const key of Object.keys(books)) {
        if (books.hasOwnProperty(key) && books[key].title === title) {
            matchingBooks.push(books[key]);
        }
    }

    if (matchingBooks.length > 0) {
        // Send the matching books
        const bookdetailsbasedontitleCall = new Promise((resolve, reject) => {          //this is part of task 13
            try {                                                                       //this is part of task 13
                const data3 = res.send(matchingBooks);                                  //const data3 = is part of task 13
                resolve(data3);                                                         //this is part of task 13
            } catch(err){                                                               //this is part of task 13
                reject(err);                                                            //this is part of task 13
            }                                                                           //this is part of task 13
        });                                                                             //this is part of task 13
        // Handling the resolved and rejected states of the promise
        bookdetailsbasedontitleCall.then(                                               //this is part of task 13
            // Logging the file data if the promise is resolved             
            (data3) => console.log(data3),                                              //this is part of task 13
            // Logging an error message if the promise is rejected
            (err) => console.log("Something is holding up the transaction.")            //this is part of task 13
        );
       
    } else {
        // No matching books found
        return res.status(300).json({ message: "Book not found" });
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send(books[req.params.isbn].reviews)
  //return res.status(300).json({message: "Yet to be implemented"});
});




module.exports.general = public_users;
