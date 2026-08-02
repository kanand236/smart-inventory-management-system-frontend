import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        navigate("/");
    };

    return (

        <nav className="bg-blue-700 shadow-md">

            <div className="max-w-7xl mx-auto px-4 py-4">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Left Side */}

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">

                        <Link
                            to="/dashboard"
                            className="text-white hover:text-yellow-300 transition cursor-pointer"
                        >
                            Dashboard
                        </Link>

                        {
                            role === "ADMIN" && (

                                <Link
                                    to="/categories"
                                    className="text-white hover:text-yellow-300 transition cursor-pointer"
                                >
                                    Categories
                                </Link>

                            )
                        }

                        <Link
                            to="/products"
                            className="text-white hover:text-yellow-300 transition cursor-pointer"
                        >
                            Products
                        </Link>

                        {
                            (role === "ADMIN" ||
                                role === "WAREHOUSEMANAGER") && (

                                <Link
                                    to="/inventory"
                                    className="text-white hover:text-yellow-300 transition cursor-pointer"
                                >
                                    Inventory
                                </Link>

                            )
                        }

                        <Link
                            to="/low-stock"
                            className="text-white hover:text-yellow-300 transition cursor-pointer"
                        >
                            Low Stock
                        </Link>

                    </div>

                    {/* Right Side */}

                    <div className="flex items-center gap-4 flex-wrap justify-center">

                        <span className="text-white text-sm">

                            Logged In :
                            <span className="font-bold ml-1">
                                {role}
                            </span>

                        </span>

                        <button
                            onClick={handleLogout}
                            className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                            cursor-pointer
                        "
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;