import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "SALESEXECUTIVE"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post(
                "/auth/register",
                formData
            );

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    >

                        <option value="ADMIN">
                            ADMIN
                        </option>

                        <option value="WAREHOUSEMANAGER">
                            WAREHOUSE MANAGER
                        </option>

                        <option value="SALESEXECUTIVE">
                            SALES EXECUTIVE
                        </option>

                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 cursor-pointer"
                    >

                        {
                            loading
                                ? "Registering..."
                                : "Register"
                        }

                    </button>

                </form>

                <p className="text-center mt-4">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-blue-600 ml-2 font-semibold"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Register;