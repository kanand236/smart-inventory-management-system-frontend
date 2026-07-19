import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        navigate("/");
    };

    const role = localStorage.getItem("role");

    return (
        <div>

            <Link to="/dashboard">
                Dashboard
            </Link>

            {" | "}

            {
                role === "ADMIN" && (
                    <>
                        <Link to="/categories">
                            Categories
                        </Link>

                        {" | "}
                    </>
                )
            }

            {" | "}

            <Link to="/products">
                Products
            </Link>

            {" | "}

            {
                (role === "ADMIN" ||
                    role === "WAREHOUSEMANAGER") && (
                    <>
                        <Link to="/inventory">
                            Inventory
                        </Link>

                        {" | "}
                    </>
                )
            }

            {" | "}

            <Link to="/low-stock">
                Low Stock
            </Link>

            {" | "}

            <button onClick={handleLogout}>
                Logout
            </button>

            <span>
                Logged In As: {role}
            </span>

            <hr />

        </div>
    );
}

export default Navbar;