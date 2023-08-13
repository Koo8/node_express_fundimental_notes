const authorize = (req, res, next) => {
    console.log(req.query)//
    const { user } = req.query
    if (user === 'john') {
        req.user = { name: 'John', id: 3 }
        next()
    }
    else {
        return res.status(401).send('Unauthorized')
    }
}

module.exports = authorize;