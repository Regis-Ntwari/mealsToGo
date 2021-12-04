import React, { createContext, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import {LoginRequest} from "./AuthenticationService"

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setisLoading] = useState(false);
    const [user, setuser] = useState(null);
    const [error, seterror] = useState(null);

    firebase.auth().onAuthStateChanged((usr) => {
        setisLoading(true)
        if(usr){
            setuser(user)
            setisLoading(false)
        }else{
            setisLoading(false)
        }
    })

    const onLogin = async(email, password) => {
        setisLoading(true);
        await LoginRequest(email, password)
            .then((user) => {
                setuser(user);
                console.log(!!user);
                setisLoading(false);
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
                seterror(error.toString());
                setisLoading(false)
            })
    }

    const onRegister = (email, password, repeatedPassword) => {
        setisLoading(true)
        if(password!== repeatedPassword){
            seterror("Error: Passwords do not match")
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((u) => {
                setuser(u);
                setisLoading(false);
            })
            .catch((e) => {
                setisLoading(false);
                seterror(e.toString())
            })
    }

    const onLogout = () => {
        setuser(null)
        firebase.auth().signOut()
    }
    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}