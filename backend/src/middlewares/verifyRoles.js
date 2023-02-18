const verifyRoles = (...requiredRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.json("Roles Error").sendStatus(401);

    const userRoles = Object.values(req.roles ?? {});

    console.log("requiredRoles", requiredRoles);
    console.log("userRoles", userRoles);

    for (const role of requiredRoles) {
      if (!userRoles.includes(role)) {
        return res.sendStatus(401);
      }
    }

    next();
  };
};

export default verifyRoles;