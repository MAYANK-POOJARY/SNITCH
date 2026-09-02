import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../service/auth.api";
import { setError, setLoading, setUser } from "../state/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isloading, error } = useSelector((state) => state.auth || {});

    async function registerHandler({ email, password, fullName, contact, role }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const isSeller = role === "seller";
            const data = await register({ email, password, fullName, contact, isSeller });
            if (data?.user) {
                dispatch(setUser(data.user));
            }
            return { success: true, user: data?.user };
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Registration failed. Please try again.";
            dispatch(setError(message));
            return { success: false, error: message };
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function loginHandler({ email, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ email, password });
            if (data?.user) {
                dispatch(setUser(data.user));
            }
            return { success: true, user: data?.user };
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Invalid email or password.";
            dispatch(setError(message));
            return { success: false, error: message };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        user,
        isLoading: isloading,
        error,
        registerHandler,
        loginHandler
    };
};