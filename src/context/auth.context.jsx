import { React, useState, useEffect, createContext } from "react";
import axios from "axios";

// Handles:
// 1) check if there is a token in the browser
// 2) verify backend call with token in header
// 3) get basic user data and set isLoggedIn
// 4) function for logging out / removing token
// 5) a wrapper for children to use the context

// create the context above react function
const AuthContext = createContext();

// everything in Wrapper has access to context
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // function for checking token in storage: is logged in?
  function authenticateUser() {
    // 1) get token from storage
    const storedToken = localStorage.getItem("authToken");
    // A 2) send token to verify route for verification check
    if (storedToken) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // A 3) save sent user data
          const user = response.data;
          // A 4) update the context states
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          console.log("user logged in.");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          // if tokens dont match, logout user
          logOutUser();
        });
      // B 2) no token available: user not logged in
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      console.log("user not logged in.");
    }
  }

  // function for logging out
  function logOutUser() {
    // 1) remove token from storage
    localStorage.removeItem("authToken");
    // 2) call authenticate to set logged in as false
    authenticateUser();
  }

  // whenever this context is rendered
  useEffect(() => {
    // 1) check if user still logged in
    authenticateUser();
  }, []);

  // make states and functions available with context
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, authenticateUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// export function and context
export { AuthProviderWrapper, AuthContext };
