export default async function getUserMiddleware(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.user = user;
        return next();
      }
      return res.status(404).json({ message: "cannot find user !" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }