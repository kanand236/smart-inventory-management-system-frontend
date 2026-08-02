import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("Email and Password are required");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "email",
                email
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);

    return (

        <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
    ">

            <div className="
            bg-white
            p-8
            rounded-xl
            shadow-lg
            w-full
            max-w-md
        ">

                <h1 className="
                text-3xl
                font-bold
                text-center
                mb-2
            ">
                    Smart Inventory System
                </h1>

                <p className="
                text-center
                text-gray-500
                mb-8
            ">
                    Welcome Back
                </p>

                <form onSubmit={handleLogin}>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                            w-full
                            border
                            border-gray-300
                            p-3
                            rounded-lg
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        />

                    </div>

                    <div className="mb-6">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="
                            w-full
                            border
                            border-gray-300
                            p-3
                            rounded-lg
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                        w-full
                        bg-blue-600
                        text-white
                        p-3
                        rounded-lg
                        hover:bg-blue-700
                        transition
                        duration-200
                        disabled:bg-gray-400
                        cursor-pointer
                    "
                    >
                        {
                            loading
                                ? "Logging In..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="text-center mt-4">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold ml-2 cursor-pointer"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Login;