import admin from '../firebase/firebaseAdmin.js';
import db from "../db/db.js";

export const getVerifiedUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log('Token in backend is:',token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token found" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = await getUserById(decodedToken.uid);
    console.log("req.user",req.user)
    next();
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: "Unauthorized" });
  }
};
export const getUserById = async (user_id) => {
  try {
    const userDocRef = db.collection("users").doc(user_id);
    const userDoc = await userDocRef.get();
    if (userDoc.exists) {
      return userDoc.data();
    }
    throw new Error("User not found");
  } catch (error) {
    throw error;
  }
};
