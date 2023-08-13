// how api endpoints are designed.
// includes: user input after query? , req.params of '/:id'

const express = require("express");
const comments = require("./data");

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Home Page</h1><a href="/api/comments">comments</a>`);
});

// set json in indentation
app.set("json spaces", 2);

// endpoint for all comments
app.get("/api/comments", (req, res) => {
  // res.json(comments)// {postId, id, name, email, body}

  // only get partial data until it is necessary for more detailed data
  const newComments = comments.map((com) => {
    const { postId, id, name } = com;
    return { postId, id, name };
  });
  res.json(newComments);
});

// endpoint for query/search with ? followed by user's input
// if query? then req.query is accessible, anything variables following ? are designed by server for filter the search. If no variables following ? then full list should be sent, or no matching result after filter, then a customized notice should be sent
app.get("/api/v1/query", (req, res) => {
  // only allow name and limit as search term
  const { name, limit } = req.query;
  //   console.log(req.query);

  var copiedComments = [...comments];
  if (name) {
    copiedComments = copiedComments.filter((comm) => {
      return comm.name.includes(name);
    });
  }
  if (limit) {
    copiedComments = copiedComments.slice(0, Number(limit));
  }
  return res.json(copiedComments);
});

// endpoint for comment with specific id using req.params
app.get("/api/comments/:Id", (req, res) => {
  // params is placeholder for user provided data,
  // its format is "/: placehoderName"
  // '/api/comments/:Id/postID/:postid' will have req.params = { Id: 1, postid: 3}
  const { Id } = req.params;
  const thecomm = comments.find((com) => com.id === Number(Id));
  if (!thecomm)
    return res.status(404).send(`Comment with id of " ${Id} " is not existed.`);
  return res.json(thecomm);
});

// endpoint for same postId
app.get("/api/comments/post/:postid", (req, res) => {
  const { postid } = req.params;
  const theComments = comments.filter((com) => com.postId === Number(postid));
  if (theComments.length === 0)
    return res
      .status(404)
      .send(`Comments with postId of " ${postid} " is not existed.`);
  return res.json(theComments);
});

app.listen(5000, () => {
  console.log("listening to port 5000.... ");
});
