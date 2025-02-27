const express = require("express");

const app = express();

// ? params
app.get("/profile/:username", (req, res) => {
  // http://localhost:8000/profile/akash199
  console.log(req.params); // ! { username: 'akash199' }
  res.send(`<h1>My usernme is ${req.params.username}</h1>`);
});

app.get("/profile/:username/article/:slug", (req, res) => {
  // http://localhost:8000/profile/akash199/article/learn%20languages
  console.log(req.params); // ! { username: 'akash199', slug: 'learn languages' }
  const formatedSlug = req.params.slug.replace(/-/g, " ");
  res.send(`<h1>This famous ${formatedSlug} article is publish by ${req.params.username} by </h1>`);
});

// ? query
app.get("/product", (req, res) => {
  // http://localhost:8000/product?search=iphone%207&limit=10
  console.log(req.query); // ! { search: 'iphone 7', limit: '10' }
  res.send(`<h1>User is looking for ${req.query.search} mobiles and limit is ${req.query.limit}</h1>`);
});

app.listen(8000, () => {
  console.log(`⚙️Server is listening at http://localhost:8000/`);
});
