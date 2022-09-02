import React, { useState, useEffect } from 'react';

import { useContext, createContext } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
 } from 'firebase/auth';

 import { auth } from '../firebaseConfig';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  }

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  }

  const logOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{createUser, googleSignIn, githubSignIn, facebookSignIn, logIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}