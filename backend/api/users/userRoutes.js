import { getVerifiedUser } from "../../utils/utils.js";
import * as userDAO from "./userDAO.js";
export default function userRoutes(app) {
  app.get("/user/info", getVerifiedUser, async (req, res) => {
    const user_id = req.user.id;
    try {
      console.log("User ID is:", user_id);
      const user = await userDAO.getUserById(user_id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  //TODO: Limit the user data coming from this API
  app.get("/user/:username", getVerifiedUser, async (req, res) => {
    const username = req.params.username;
    try {
      const user = await userDAO.fetchOtherUserData(username);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/user/update", getVerifiedUser, async (req, res) => {
    const user_id = req.user.id;
    const userData = req.body;
    try {
      const updatedUser = await userDAO.updateUserById(user_id, userData);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
