import db from "../../db/db.js";

export const createInterpretation = async (
  user_id,
  username,
  interpretation,
  song_id
) => {
  try {
    const docRef = await db.collection("interpretations").add({
      user_id: user_id,
      username:username,
      song_id: song_id,
      interpretation_text: interpretation,
      createdAt: new Date().toISOString(), 
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding interpretation to DB :", error);
    return { success: false, error: error.message };
  }
};
