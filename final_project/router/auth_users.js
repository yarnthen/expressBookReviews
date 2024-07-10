const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userswithsamename = users.filter((user)=>{
        return user.username === username;
    });
    return userswithsamename.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const matchedUsers = users.filter((user) => user.username === username && user.password === password);
  return matchedUsers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    console.log("login: ", req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Insufficient details provided! Please try again."});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Details are incorrect! Please try again."});
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;

    if (books[isbn]) {
        let book = books[isbn];
        book.reviews[username] = review;
        res.send(books[isbn]);
        return res.status(200).send("Review successfully posted");
    }
    else {
        return res.status(404).json({message: `ISBN not found`});
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  if (books[isbn]) {
      let book = books[isbn];
      delete book.reviews[username];
      return res.status(200).send("Review successfully deleted");
  }
  else {
      return res.status(404).json({message: `ISBN ${isbn} not found`});
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
