import { useContext } from "react"
import { AuthContext } from "../shared/authprovider/authprovider";



const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;