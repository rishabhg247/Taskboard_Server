const express = require('express');
const app = express();
app.use(express.json());
const { Lists, Users } = require('../database/mongooseInit');
const router = express.Router();

// api to get data of current user..
router.post('/api/data', async(req, res) => { 
  let result=await Lists.findOne(req.body);
  res.json(result.lists);
})
//post api..
router.post('/api/lists', async (req, res) => {
  try {
    const { username, lists } = req.body;
    // Check if data of same username already exists
    const existingUserData = await Lists.findOne({ username });
    if (existingUserData) {
      await Lists.updateOne({ username: username }, { $set: { lists: lists } });
      res.json({ message: 'Data updated successfully' });
    } else {
      // If user doesn't exist, create a document
      try {
        const newList = new Lists(req.body);
        const savedList = await newList.save();
        res.json(savedList);
      } catch (error) { res.status(500).json({ error: error.message }) }
    }
  } catch (err) { res.status(500).json({ err: err.message }) }
});
//delete api..
router.delete('/api/delete', async (req, res) => {
  try {
    await Lists.deleteMany();
    res.status(201).send('Deleted succesfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//api to register new user
router.post("/api/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "User or email already exists!" });
    }
    // Create a new user document
    const newUser = new Users({ username, email, password });
    await newUser.save();

    return res.status(200).json({ message: "Cheers!! Your account is created.." });
  } catch (error) {
    return res.status(500).json(error);
  }
});
// api for authenticate on login
router.post("/api/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    // Find the user by username
    const user = await Users.findOne({ username });
    if (!user) { return res.status(404).json("User not found!") }
    // Check the provided password against the stored password
    if (password === user.password) {
      // Remove the password from the response
      const { password: _, ...userData } = user.toObject();
      return res.status(200).json(userData);
    } else { return res.status(400).json("Wrong password!") }
  } catch (error) {
    return res.status(500).json(error);
  }
});
//test api..
router.get('/', (req, res) => { res.send('Hello..This is test API for my Task Board project...'); })

module.exports = router;
