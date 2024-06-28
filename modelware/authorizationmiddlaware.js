require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.protect = (req, res, next) => {
    try {
        let token;

        console.log('Authorization Header:', req.headers.authorization); // Log the authorization header

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
        }

        console.log('Extracted Token:', token); // Log the extracted token

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        const SECRETEKEY = process.env.JWT_SECRETE_KEY;
        if (!SECRETEKEY) {
            throw new Error('Secret key not found in environment variables');
        }

        const decodedToken = jwt.verify(token, SECRETEKEY);
        console.log('Decoded Token:', decodedToken);  // Log the decoded token

        req.user = decodedToken;  // Assign the decoded token to req.user
        next();
    } catch (error) {
        console.error('Authorization Error:', error.message);  // Log the error
        res.status(401).json({ message: "You are not authorized", error: error.message });
    }
};

module.exports.restrictedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You do not have permission to access this route" });
        }
        next();
    }
};


