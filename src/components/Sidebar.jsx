import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };

    return (

        <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h2 className="text-2xl font-bold mb-8">
                Inventory System
            </h2>

            <div className="flex flex-col gap-4">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                {
                    role === "ADMIN" && (
                        <Link to="/categories">
                            Categories
                        </Link>
                    )
                }

                <Link to="/products">
                    Products
                </Link>

                {
                    (role === "ADMIN" ||
                        role === "WAREHOUSEMANAGER") && (
                        <Link to="/inventory">
                            Inventory
                        </Link>
                    )
                }

                <Link to="/low-stock">
                    Low Stock
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 p-2 rounded mt-5"
                >
                    Logout
                </button>

            </div>

            <div className="mt-10 text-sm">
                Logged In As:
                <br />
                <b>{role}</b>
            </div>

        </div>
    );
}

export default Sidebar;