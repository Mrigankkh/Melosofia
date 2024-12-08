import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:8000";

export const fetchUserData = async (currentUser) => {
  try {
    // const user = auth.currentUser;

    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      const userData = await axios.get(`${SERVER_BASE_URL}/user/info`, {
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
      `${SERVER_BASE_URL}/user/${username}`,
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
