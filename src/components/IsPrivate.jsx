import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

// everything wrapped in this component:
// > only show children if * logged in *
// > redirect if not logged in

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (!isLoading) {
    // if logged in, show the content
    if (isLoggedIn) {
      return props.children;
      // if not logged in, navigate to login page
    } else {
      return <Navigate to="/admin" />;
    }
  }
}

export default IsPrivate;
