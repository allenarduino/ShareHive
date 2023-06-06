const axios = require('axios');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Register a new user
exports.register = async (req, res) => {
  try {
    const {email, password, name} = req.body;

    const requestData = {
      userId: crypto.randomUUID(),
      email,
      password,
      name,
    };

    const response = await axios.post(
      `${process.env.APPWRITE_PROJECT_ENDPOINT}/account `,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Response-Format': '1.0.0',
          'X-Appwrite-Project': `${process.env.APPWRITE_PROJECT_ID}`,
        },
      },
    );

    const payload = {
      email: response.data.$email,
      userId: response.data.$id,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).json({success: true, token});
  } catch (error) {
    if (error.response.status === 409) {
      res.status(409).json({
        success: false,
        message: 'User with email already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: 'An error occurred while registering the user',
    });
    console.log(error.response.status);
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const requestData = {
      userId: crypto.randomUUID(),
      email,
      password,
    };

    // Authenticate user
    const response = await axios.post(
      `${process.env.APPWRITE_PROJECT_ENDPOINT}/account/sessions/email`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Response-Format': '1.0.0',
          'X-Appwrite-Project': `${process.env.APPWRITE_PROJECT_ID}`,
        },
      },
    );

    const payload = {
      email: response.data.$email,
      userId: response.data.$id,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(200).json({success: true, jwt: token});
  } catch (error) {
    if (error.response.status === 401) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
    res
      .status(500)
      .json({success: false, message: 'An error occurred while logging in'});
  }
};
