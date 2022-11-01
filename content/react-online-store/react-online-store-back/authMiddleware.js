const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if(req.method === 'OPTIONS'){
        next()
    }

    try {
        const {token} = req.body
        if(!token){
            return res.status(400).json({msg: 'The user is not logged in'})
        }
        const decoded = jwt.verify(token, 'secret')
        req.user = decoded
        return res.status(200).json({msg: 'logged in', userData: req.user.userData})
    } catch (e) {
        console.log(e)
        return res.status(400).json({msg: 'The user is not logged in'})
    }
}