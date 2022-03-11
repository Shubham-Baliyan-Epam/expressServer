const jwt = require("jsonwebtoken");
const db = require("../model/index");

const verify = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      (err, decode) => {
        if (err) {
          req.user = undefined;
          next();
        }
        db.User.findOne({
          where: {
            id: decode.id,
          },
          raw: true,
        })
          .then((res) => {
            req.user = res;
            next();
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verify;
