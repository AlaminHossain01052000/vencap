/* eslint-disable no-undef */
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, getIdToken ,deleteUser as firebaseDeleteUser,sendEmailVerification, signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../utilities/firebase.init";
import axios from "axios";


initializeFirebase();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [admin,setAdmin]=useState(false)
    const [token, setToken] = useState("");
    const auth = getAuth();
    // auth.languageCode = 'it';

    const registerNewUser = async (userInfo, navigate) => {
        setLoading(true);
        setError(null);
    
        const { email, password } = userInfo || {};
        console.log(email)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            if (user) {
                // Update Profile
                await updateProfile(user, { displayName: userInfo.name });
    
                // Send Email Verification
                await sendEmailVerification(user);
                alert("A verification email has been sent. Please check your inbox and verify your email.");
                await auth.signOut();
                // Store user info in the database
                await axios.post("http://localhost:5001/users", { ...userInfo, balance: 0 }, {
                    headers: { "Content-Type": "application/json" }
                });
    
                // Set user state
                setUser(user);
    
                // Navigate after successful registration
                navigate("/login");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const loginUser = async (email, password, navigate, location,fromOtp=false) => {
        setLoading(true);
        setError("");
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Check if email is verified
            if (!user?.emailVerified) {
                setError("Please verify your email before logging in.");
                await sendEmailVerification(user);
                alert("A verification email has been sent. Please check your inbox and verify your email.");
                await auth.signOut(); // Prevent unverified users from staying logged in
                return;
            }
            if(fromOtp)return;
            // Redirect user after successful login
            // console.log(location)
            const redirect_url ="/";
            // console.log(redirect_url)
            navigate(redirect_url, { replace: true });
    
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
   
    const logoutUser = () => {
        setLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            setError(error.message)
        })
            .finally(() => setLoading(false))
            ;
    }
    const deleteUser = async (email) => {
        setLoading(true);
        console.log(email)
        if(email===undefined){
            return
        }
        try {
            // Fetch user data to get user ID
            const response = await axios.get(`http://localhost:5001/users/single?email=${email}`);
            const userToDelete = response.data;

            if (!userToDelete) {
                throw new Error("User not found in local database");
            }
            console.log(userToDelete)

            // Delete user from local database
            await axios.delete(`http://localhost:5001/users/${userToDelete._id}`);

            // Delete user from Firebase
            const userRecord = await auth.getUserByEmail(email);
            await firebaseDeleteUser(userRecord);

            setUser((prevUsers) => prevUsers.filter(user => user.email !== email));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    const initializeRecaptcha = () => {
        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    "recaptcha-container",
                    {
                        size: "invisible",
                        callback: (response) => {
                            console.log("reCAPTCHA verified", response);
                        },
                        "expired-callback": () => {
                            console.log("reCAPTCHA expired");
                        },
                    }
                );
                // window.recaptchaVerifier.render(); // Ensure it's properly attached
            }
        } catch (error) {
            console.error("Recaptcha initialization error:", error);
        }
    };
    const handleSendOtp = async (setConfirmResult,phoneNumber) => {
       console.log(phoneNumber)
        setLoading(true);
        setError("");

        try {
            
            initializeRecaptcha();
            const appVerifier = await window.recaptchaVerifier;
            // console.log(appVerifier)
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber,appVerifier);
            await setConfirmResult(confirmationResult);
            
            alert("OTP sent to your mobile number!");
        } catch (error) {
            setError(error.message);
            console.log(error.message)
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (confirmResult,verificationCode,email,password,navigate,location) => {
        setLoading(true);
        setError("");

        try {
            await confirmResult.confirm(verificationCode);
            alert("Phone number verified successfully!");
            await loginUser(email,password,navigate,location,true)
            try {
                const response = await fetch('http://localhost:5001/user/updateUserMobileVerified', {
                    method: 'POST', // Use POST method
                    headers: {
                        'Content-Type': 'application/json', // Send JSON data
                    },
                    body: JSON.stringify({
                        userEmail:user.email,
                        
                    }), // Send user email and interests as JSON
                });
        
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
        
                // const data = await response.json(); // Parse the JSON response
                alert("User Contact Verified Successfully");
                // console.log('User updated successfully:', data);
                
            } catch (error) {
              setError(error);
                console.error('Error updating user:', error);
            }
            // return 1;
            // Proceed with your application logic (e.g., redirect to the home page)
        } catch (error) {
            alert(error)
            // return -1;
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user&&user?.emailVerified) {
                console.log(user.emailVerified)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User

                setUser(user);
                if(user.email==='alaminhossain2000and@gmail.com'){
                    setAdmin(true)
                }
                else setAdmin(false)
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                // When User is signed out

                setUser({})
            }
            setLoading(false);
        });
        
    }, [auth])
    return {
        user,
    
        registerNewUser,
        admin,
        logoutUser,
        loginUser,
        loading,
        error,
        token,
        deleteUser,
        handleSendOtp,
        handleVerifyOtp
    }
}
export default useFirebase;