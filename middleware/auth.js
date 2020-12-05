const jwt = require ('jsonwebtoken');

module.exports = function (req, res, next) {
//  const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).json ({msg: 'Token Invalid'});
//   }

//   try {
//     const decode = jwt.verify (token, 'jwtSecret');
//     req.user = decode.user;
//     next ();
//   } catch (err) {
//     res.status (401).json ({msg: 'Token anda tidak valid'});
//   }
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'jwtSecret')
    if(!payload) {
      return res.status(401).send('Unauthorized request')
    }
    req.user = payload.user
    next()
};