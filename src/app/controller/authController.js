import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../config/Redis/clientRedis";

class AuthController {
  index(req, res) {
    res.send("home");
  }
  async refreshToken(req, res) {
    const id = req.body._id;
    const refreshToken = req.body.refreshToken;
    try {
      const getRT = await client.get(id)
      console.log(getRT+' ---- '+refreshToken);
      if (getRT !== refreshToken) return res.status(403).json({ message: "refreshToken not found" });

      const newrefeshToken = generateToken(
        { _id: id },
        process.env.REFRESH_TOKEN_SECRET,
        0.1
      );
      client.setex(id, 60*60, newrefeshToken);
      res.json({_id:id,refeshToken:newrefeshToken})
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  async login(req, res) {
    try {
      console.log(req.body);
      const user = await User.findOne({ username: req.body.username });
      //Authentication
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          // response an accessToken
          const accessToken = generateToken(
            { username: user.username, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            10
          );
          const refreshToken = generateToken(
            { username: user.username, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            0.1
          );
          client.setex(user._id, 60*60, refreshToken);
          return res.json({
            message: "Login succesfully",
            _id:user._id,
            accessToken,
            refreshToken,
          });
        }
        //Wrong password
        return res.status(401).json({ message: "wrong password" });
      }
      // cannot found account
      res.status(404).json({ message: "Cannot found username" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

function generateToken(data, tokenSecret, exprired) {
  return jwt.sign(data, tokenSecret, { expiresIn: exprired + "m" });
}
export default new AuthController();
