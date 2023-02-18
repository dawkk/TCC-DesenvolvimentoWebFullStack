import jwt from 'jsonwebtoken';


function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(
      token, 
      secret,
      (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.id = decoded.UserInfo._id;
        req.roles = decoded.UserInfo.roles;
        next();
      }
  );
}

export default verifyJWT;