const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            res.status(401).json({messege: 'Not authorized'});
            return;
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded;
        next();

    } catch (e) {
        res.status(401).json({messege: 'Not authorized'});
    }
}