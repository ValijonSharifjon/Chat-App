import {useState} from "react";
import toast from "react-hot-toast";
import {SignUpInputsType} from "../pages/signup/SignUp.tsx";
import {useAuthContext} from "../context/AuthContext.tsx";

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    // @ts-ignore
    const {setAuthUser} = useAuthContext()
    const signup = async ({fullName, username, password, confirmPassword, gender}: SignUpInputsType) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data));

            setAuthUser(data)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return {loading, signup}
};

export default useSignup;

function handleInputErrors({fullName, username, password, confirmPassword, gender}: SignUpInputsType) {
    if (!fullName || !username || !password || !confirmPassword || !gender ) {
        toast.error('Please fill all the fields')
        return false
    }

    if (password !== confirmPassword) {
        toast.error('Password do not match')
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true
}