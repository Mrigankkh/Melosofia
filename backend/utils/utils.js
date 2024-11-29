import admin from '../firebase/firebaseAdmin.js';
export const getVerifiedUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log('Token is:',token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token found" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log(req.user)
    next();
  } catch (e) {
    console.log(e)
    return res.status(401).json({ error: "Unauthorized" });
  }
};
