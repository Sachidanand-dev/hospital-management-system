const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    // authMiddleware must run before this
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Forbidden: You don't have permission",
      });
    }

    next();
  };
};

export default roleMiddleware;
