//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();
//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.generateToken = (req, res, next) => {
    const payload = {
      userId: res.locals.userId,
      timestamp: new Date()
    };
  
    const options = {
      algorithm: tokenAlgorithm,
      expiresIn: tokenDuration,
    };
  
    const callback = (err, token) => {
      if (err) {
        console.error("Error jwt:", err);
        res.status(500).json(err);
      } else {
        res.locals.token = token;
        next();
      }
    };
  
    const token = jwt.sign(payload, secretKey, options, callback);

};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
    res.status(200).json({
      results: res.locals
    });
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
  
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Your session time has expired :/ Please log in again :D' });
    }
  
    const token = authHeader.substring(7);
  
    if (!token) {
      return res.status(401).json({ message: `Your session time has expired :/ Please log in again :D` });
    }
  
    const callback = (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: `Your session time has expired :/ Please log in again :D` });
      }
  
      res.locals.userId = decoded.userId;
      res.locals.tokenTimestamp = decoded.timestamp;
  
      next();
    };
  
    jwt.verify(token, secretKey, callback);
};