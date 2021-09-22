module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }

    try {
        const listId = req.headers.listid;

        req.listId = listId;
        next();

    } catch (e) {
        res.status(401).json({messege: 'Not found list id'});
    }
}