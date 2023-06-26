import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// User data storage
let users: any[] = [];

// Create a user
app.post('/api/user', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveData();
  res.status(201).json(newUser);
});

// Get user by ID
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (user) {
    const { password, ...userInfo } = user;
    res.json(userInfo);
  } else {
    res.sendStatus(404);
  }
});

// Get user by email
app.get('/api/user-by-email/:email', (req, res) => {
  const { email } = req.params;
  const user = users.find((u) => u.email === email);
  if (user) {
    const { password, ...userInfo } = user;
    res.json(userInfo);
  } else {
    res.sendStatus(404);
  }
});

// Update a user
app.put('/api/user', (req, res) => {
  const { id, name, email } = req.body;
  const user = users.find((u) => u.id === id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    saveData();
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// Update a user's email
app.put('/api/user-email', (req, res) => {
  const { email, newEmail } = req.body;
  const user = users.find((u) => u.email === email);
  if (user) {
    user.email = newEmail;
    saveData();
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// Delete a user
app.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    saveData();
    res.json(deletedUser[0]);
  } else {
    res.sendStatus(404);
  }
});

// Save user data to JSON file
const saveData = () => {
  fs.writeFileSync }