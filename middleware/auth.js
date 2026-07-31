const supabase = require("../db");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access token is required",
    });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  req.user = data.user;
  next();
};

module.exports = authMiddleware;