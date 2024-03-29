
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const secretKey = crypto.randomBytes(64).toString('hex');


const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  };
  
  
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, password } = req.body;
    
    
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    user = await User.create({
      firstName,
      lastName,
      mobileNumber,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Signup successful', user });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
