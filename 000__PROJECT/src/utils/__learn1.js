/*
// When you write:
const createPost = helper(async (req, res) => {    // This entire function
  const { title, content, author } = req.body;
  const post = await Post.create({
      title,
      content,
      author,
  });
  res.status(201).json({
      success: true,
      post,
  });
});

// The helper receives this function as 'fn':
const helper = (fn) => async (req, res, next) => {
  try {
      await fn(req, res, next);     // HERE! This is where your function runs
  } catch (error) {
      // Error handling
  }
};

*/
//  ! #

// Part 1: Your actual route logic
const createPost = helper(
  // This is the function you're passing to helper
  async (req, res) => {
    const { title, content, author } = req.body;

    const post = await Post.create({ title, content, author });

    res.status(201).json({success: true,post,
    });
  }
);

// Part 2: The helper function that adds error handling
const helper = (fn) => {

  return async (req, res) => {
    
    try {
      await fn(req, res); // [6]
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
