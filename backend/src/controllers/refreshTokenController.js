import jwt from 'jsonwebtoken';


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const findUser = await users.findOne({ refreshToken }).exec();
  if (!findUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || findUser.username !== decoded.username) return res.sendStatus(403);
      const roles = Object.values(findUser.roles);
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "id": decoded._id,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2m' }
      );
      res.json({ roles, accessToken })
    }
  );
}

export default handleRefreshToken;