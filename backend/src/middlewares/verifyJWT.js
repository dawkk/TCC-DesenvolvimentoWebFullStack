import jwt from 'jsonwebtoken';


function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acesso negado!" });
  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(
      token, 
      secret,
      (err, decoded) => {
        if(err) return res.sendStatus(403).json({message: "O Token é invalido"});
        req.id = decoded.UserInfo._id;
        req.roles = decoded.UserInfo.roles;
        next();
      }
  );
}

export default verifyJWT;