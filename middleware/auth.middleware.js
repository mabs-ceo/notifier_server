async function authMiddleware(req, res, next) {
    // Middleware to check if the user is authenticated
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
}


module.exports = authMiddleware;