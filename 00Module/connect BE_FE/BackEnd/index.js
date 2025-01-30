const express = require("express");

const app = express();

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "This is a joke",
    },
    {
      id: 2,
      title: "A second joke",
      content: "This is second joke",
    },
    {
      id: 3,
      title: "A third joke",
      content: "This is third joke",
    },
  ];
  res.send(jokes);
}); 

app.listen(3000, () => {
  console.log(`Server is listening at http://localhost:3000/`);
});
