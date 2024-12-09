import db from "../../db/db.js";

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

export const fetchOtherUserData = async (username) => {
  const userRef = db.collection("users");

  try {
    const snapshot = await userRef
      .where("name", "==", username) // Query to filter by 'name'
      .limit(1) // Limit the results to 1
      .get(); // Execute the query

    if (snapshot.empty) {
      throw new Error("No user found with the given username");
    }
    const user = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return user[0];
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (user_id, userData) => {
  try {
    const userDocRef = db.collection("users").doc(user_id);
    await userDocRef.update(userData);
    const updatedUserDoc = await userDocRef.get();
    if (updatedUserDoc.exists) {
      return updatedUserDoc.data();
    }
    throw new Error("User not found after update");
  } catch (error) {
    throw error;
  }
};
