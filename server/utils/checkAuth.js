// Simple check to verify user authentication
module.exports = function checkAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }
    next();
};
