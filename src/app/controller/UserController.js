import User from "../models/User";
import bcrypt from "bcrypt";
class UserController {
  async getAll(req, res) {
    const users = await User.find();
    res.json(users);
  }
  async getOne(req, res) {
    try {
      const user = await User.find(req.params.id);
      res.json({ message: user.username });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async create(req, res) {
    try {
      console.log('---------',req.body);
      if (await User.findOne({ username: req.body.username })) return res.status(401).json({ message: "username exists" });
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        username: req.body.username,
        password: hashPassword,
      });
      await user.save();
      res.status(201).json({ message: user });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async update(req, res) {
    const id = res.user._id;
    try {
      const updated = await User.update({ id }, req.body);
      res.status(201).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async delete(req, res) {
    try {
      await res.user.remove();
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default new UserController();
