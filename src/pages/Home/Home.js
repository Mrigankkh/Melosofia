import React from "react";
import { useSelector } from "react-redux";

const Home = () => {

  console.log('State is: '+ useSelector(state => state.authSlice))
  const user = useSelector((state) => state.auth.user); // Adjust the path based on your slice
  console.log('User is'+user)
  return (
    <div>
      <h1>Welcome to Melosofia</h1>
      <p>This is the home page of Melosofia.</p>
      {user.name}
    </div>
  );
};

export default Home;
