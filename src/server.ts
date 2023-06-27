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



// Save user data to JSON file
const saveData = () => {
  fs.writeFileSync }