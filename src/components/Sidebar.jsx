import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
                <h2 className="text-xl font-bold">Inventory System</h2>

                <button
                    onClick={() => setIsOpen(true)}
                    className="cursor-pointer"
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                fixed
                md:static
                top-0
                left-0
                h-full
                w-64
                bg-gray-900
                text-white
                p-5
                shadow-lg
                z-50
                transform
                transition-transform
                duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-2xl font-bold">
                        Inventory System
                    </h2>

                    <button
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={26} />
                    </button>

                </div>

                {/* Menu */}

                <div className="flex flex-col gap-2">

                    <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    >
                        Dashboard
                    </Link>

                    {role === "ADMIN" && (

                        <Link
                            to="/categories"
                            onClick={() => setIsOpen(false)}
                            className="p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                        >
                            Categories
                        </Link>

                    )}

                    <Link
                        to="/products"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    >
                        Products
                    </Link>

                    {(role === "ADMIN" ||
                        role === "WAREHOUSEMANAGER") && (

                            <Link
                                to="/inventory"
                                onClick={() => setIsOpen(false)}
                                className="p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                            >
                                Inventory
                            </Link>

                        )}

                    <Link
                        to="/low-stock"
                        onClick={() => setIsOpen(false)}
                        className="p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                    >
                        Low Stock
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="
                        mt-5
                        bg-red-500
                        hover:bg-red-600
                        p-3
                        rounded-lg
                        transition
                        cursor-pointer
                        font-semibold
                    "
                    >
                        Logout
                    </button>

                </div>

                <div className="mt-10 border-t border-gray-700 pt-5 text-sm">

                    <p>Logged In As</p>

                    <p className="font-bold text-green-400 mt-1">
                        {role}
                    </p>

                </div>

            </div>
        </>
    );
}

export default Sidebar;