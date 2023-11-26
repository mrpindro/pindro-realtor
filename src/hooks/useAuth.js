import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let status = 'user';

    if (token) {
        const decoded = jwtDecode(JSON.stringify(token));
        const { name, email, phoneNum, image, roles, userId } = decoded.UserInfo;

        isAdmin = roles.includes('admin');

        if (isAdmin) {
            status = 'Admin';
        }

        return { name, email, phoneNum, image, roles, userId, isAdmin, status }
    }

    return { 
        name: '', email: '', phoneNum: '', image: null, roles: [], userId: '', isAdmin, status 
    }
}

export default useAuth;