import setAuthToken from "./setAuthToken";
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileAction";

const deleteAuthToken = (store) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        const decoded = jwt_decode(localStorage.token);
        store.dispatch(setCurrentUser(decoded));

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            store.dispatch(logoutUser());
            store.dispatch(clearCurrentProfile())
            window.location.href = '/login'
        }
    }
}

export default deleteAuthToken;