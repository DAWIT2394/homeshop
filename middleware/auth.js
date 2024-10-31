const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, '3434r', (err, user) => {
        if (err) {
            console.error("Token verification error:", err); // Log error details
            return res.status(403).json({ message: 'Invalid token', error: err.message });
        }
        req.user = user;
        next();
    });
};
