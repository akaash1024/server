// Pattern 2: Using Promises
const helper = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .then((result) => result)
      .catch((err) => next(err));
  };
};

// or with Promises:
const createPost = helper((req, res) => {
  return Post.create(req.body).then((post) => res.json(post));
});
 