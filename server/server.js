const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String }, // Store the image path or filename
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

// Sign up endpoint
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create a new user with role set to 'user'
    const newUser = await User.create({ username, email, password, role: 'user' });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set the redirection path based on the user's role
    let redirect;
    if (user.role === 'admin') {
      redirect = '/pages/profile/adminProfile';
    } else if (user.role === 'moderator') {
      redirect = '/pages/profile/moderatorProfile';
    } else {
      redirect = `/pages/profile/${user._id}`;
    }

    console.log("Redirecting to:", redirect);

    // Respond with the redirection path and user's role
    return res.status(200).json({ redirect, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Get user profile endpoint
app.get('/api/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user profile endpoint
app.put('/api/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body; // Include role in the request body

  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }

  try {
    // Construct the update object based on the fields provided
    const updateObject = { username, email };
    if (role) {
      updateObject.role = role; // Include role if provided
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateObject,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete user profile endpoint
app.delete('/api/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/api/articles', upload.single('image'), async (req, res) => {
  const { content } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : undefined;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const newArticle = await Article.create({ content, image: imagePath });
    res.json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get('/api/articles/title/:title', async (req, res) => {
  const { title } = req.params;

  try {   
    // Decode spaces to hyphens to match the title
    const decodedTitleWithSpace = decodeURIComponent(title.replace(/-/g, ' '));

    // Update the query to search for the title within HTML content
    const articles = await Article.find();
    const foundArticle = articles.find(article => {
      const dom = new JSDOM(article.content);
      const h1Element = dom.window.document.querySelector('h1');
      return h1Element && h1Element.textContent === decodedTitleWithSpace;
    });

    if (!foundArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(foundArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//route to get an article by id
app.get('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/articles/:id', async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, updated_at: Date.now() },
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Article.findByIdAndDelete(id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

