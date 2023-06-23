// To create a todo-list web app with the specified functionalities, we can use a backend framework like Node.js and a database like MongoDB to store the todo items. We can also use an API testing tool like Postman to test the API endpoints.

// Here are the steps to create the todo-list web app:

// 1. Set up a new Node.js project with the following dependencies:
//    - express: A web framework for Node.js
//    - mongoose: A MongoDB object modeling tool
//    - body-parser: A middleware to parse JSON and urlencoded data

// 2. Create a MongoDB database and connect to it using Mongoose.

// 3. Define a Mongoose schema for the todo items with the following properties:
//    - id: An auto-generated and incremental unique identifier
//    - name: A string representing the name of the todo item
//    - status: A string representing the status of the todo item (default value is 'todo')
//    - time: A Date object representing the time of the todo item (default value is the current time)
//    - priority: A string representing the priority of the todo item (default value is 'low')

// 4. Create a new Express router to handle the API endpoints for the todo items.

// 5. Define the following API endpoints:
//    - GET /api/todo: Returns a list of all the todo items that match the specified filter (if any).
//    - POST /api/todo: Adds a new todo item with the specified properties.
//    - PUT /api/todo/:id: Updates the todo item with the specified ID.
//    - DELETE /api/todo/:id: Deletes the todo item with the specified ID.

// 6. Implement the API endpoints using Mongoose methods to interact with the MongoDB database.

// 7. Test the API endpoints using Postman or any other API testing tool.

// Here's an example implementation of the API endpoints:

// ```javascript

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const Todo = require('../models/todo');

router.use(bodyParser.json());

// GET /api/todo?name=&status=&priority=
router.get('/api/todo', async (req, res) => {
  const filter = {};
  if (req.query.name) {
    filter.name = req.query.name;
  }
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.priority) {
    filter.priority = req.query.priority;
  }
  const todos = await Todo.find(filter);
  res.json(todos);
});

// POST /api/todo
router.post('/api/todo', async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/todo/:id
router.put('/api/todo/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'status', 'priority'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found!' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/todo/:id
router.delete('/api/todo/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found!' });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

