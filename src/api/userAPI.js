import axios from "axios";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider.js";

export const fetchUserData = async (currentUser) => {
  try {
    // const user = auth.currentUser;

    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      const userData = await axios.get("http://localhost:8000/user/info", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      return userData.data;
    } else {
      console.log("No user found");
      throw new Error("No user found");
    }
  } catch (error) {
    console.log(error);
  }
};
//TODO: Make this restricted!
export const fetchOtherUserData = async (currentUser,username) => {

  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    console.log("Token is:", idToken);
    const userDetails = await axios.get(
      `http://localhost:8000/user/${username}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return userDetails.data;
  }
  else
    console.log("No user found");
};
