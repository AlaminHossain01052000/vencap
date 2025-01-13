import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, getIdToken ,deleteUser as firebaseDeleteUser} from "firebase/auth";
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
   
    const registerNewUser =async (userInfo, navigate) => {
        setLoading(true);
        const {email,password}=userInfo||{}
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // const newUser = { name: name, email: userInfo.email };
                setUser(user);
                updateProfile(auth.currentUser).then(() => {
                    // Set User Display Name

                }).catch((error) => {
                    // An error occurred At the time of setting user displayName
                    setError(error);

                });
                 axios.post('http://localhost:5000/users', {...userInfo,balance:0}, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
                // axios.post('http://localhost:5000/users', {...userInfo,balance:0})
                setLoading(false)
                navigate("/");
            })
            .catch((error) => {


                setError(error.message);
            })
            .finally(() => setLoading(false))
            ;
    }
    const loginUser = (email, password, navigate, location) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setError("");
                console.log(location);
                const redirect_url = location?.state?.from?.pathname || "/";
                console.log(redirect_url);
                navigate(redirect_url, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
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
            const response = await axios.get(`http://localhost:5000/users/single?email=${email}`);
            const userToDelete = response.data;

            if (!userToDelete) {
                throw new Error("User not found in local database");
            }
            console.log(userToDelete)

            // Delete user from local database
            await axios.delete(`http://localhost:5000/users/${userToDelete._id}`);

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
    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
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
        deleteUser
    }
}
export default useFirebase;