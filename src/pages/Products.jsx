import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Layout from "../components/Layout";

function Products() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [stockQuantity, setStockQuantity] = useState("");

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const role = localStorage.getItem("role");

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        quantity: "",
        minimumStock: "",
        categoryId: ""
    });

    useEffect(() => {

        fetchProducts();

        fetchCategories();

    }, [page]);

    const fetchProducts = async () => {

        try {

            // const response = await api.get("/products");

            const response = await api.get(
                `/products/paginated?page=${page}&size=5`
            );

            // setProducts(response.data);

            setProducts(response.data.content);

            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.log(error);

        }
    };

    // Delete Products

    const handleDelete = async (id) => {

        try {

            await api.delete(`/products/${id}`);

            alert("Product Deleted Successfully");

            fetchProducts();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );
        }
    };

    // Stock Update

    const updateStock = async (id, increase) => {

        const qty = prompt("Enter Quantity");

        if (!qty) return;

        try {

            await api.patch(`/products/${id}/stock`, {
                quantity: Number(qty),
                increase: increase
            });

            alert("Stock Updated");

            fetchProducts();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Stock Update Failed"
            );
        }
    };

    const fetchCategories = async () => {

        try {

            const response = await api.get("/category");

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/products", formData);

            alert("Product Added Successfully");

            setFormData({
                name: "",
                sku: "",
                price: "",
                quantity: "",
                minimumStock: "",
                categoryId: ""
            });

            fetchProducts();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error while creating product"
            );

        }
    };
    return (
        <Layout>
            <div>

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Product Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage products, categories and inventory.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-5">

                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                            Total Products : {products.length}
                        </div>

                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                            Total Categories : {categories.length}
                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Add Product
                    </h2>

                    {/* Form Here */}

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="
w-full
border
border-gray-300
rounded-lg
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
                            />


                            <input
                                type="text"
                                name="sku"
                                placeholder="SKU"
                                value={formData.sku}
                                onChange={handleChange}
                                className="
w-full
border
border-gray-300
rounded-lg
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
                            />



                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="
w-full
border
border-gray-300
rounded-lg
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
                            />



                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="
w-full
border
border-gray-300
rounded-lg
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
                            />



                            <input
                                type="number"
                                name="minimumStock"
                                placeholder="Minimum Stock"
                                value={formData.minimumStock}
                                onChange={handleChange}
                                className="
w-full
border
border-gray-300
rounded-lg
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
                            />



                        </div>




                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="
w-full
border
border-gray-300
rounded-lg
p-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
                        >

                            <option value="">
                                Select Category
                            </option>

                            {
                                categories.map(category => (

                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>

                                ))
                            }

                        </select>



                        <button
                            type="submit"
                            className="
mt-5
w-full
sm:w-auto
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-lg
transition
cursor-pointer
"
                        >
                            Add Product
                        </button>

                    </form>

                </div>

                {/* Product List */}

                <hr />

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Product List
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full border border-gray-300 rounded-lg">

                        <thead>

                            <tr className="bg-gray-100 text-left">

                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">SKU</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Quantity</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.map(product => (

                                    <tr key={product.id}>

                                        <td className="px-4 py-3 border-t">{product.name}</td>

                                        <td className="px-4 py-3 border-t">{product.sku}</td>

                                        <td className="px-4 py-3 border-t">{product.price}</td>

                                        <td className="px-4 py-3 border-t">{product.quantity}</td>

                                        <td className="px-4 py-3 border-t">{product.categoryName}</td>

                                        <td className="px-4 py-3 border-t">

                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
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
                                                Delete
                                            </button>

                                            <div className="flex flex-col gap-2">

                                                <button
                                                    onClick={() => updateStock(product.id, true)}
                                                    className="
            bg-green-600
            hover:bg-green-700
            text-white
            rounded-lg
            px-3
            py-2
            cursor-pointer
        "
                                                >
                                                    + Stock
                                                </button>

                                                <button
                                                    onClick={() => updateStock(product.id, false)}
                                                    className="
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            rounded-lg
            px-3
            py-2
            cursor-pointer
        "
                                                >
                                                    - Stock
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-lg
            px-3
            py-2
            cursor-pointer
        "
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>
                </div>
                {/* Added here pagination */}

                <div className="flex justify-center items-center gap-5 mt-8">

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className="
            bg-gray-700
            hover:bg-gray-800
            text-white
            px-4
            py-2
            rounded-lg
            disabled:bg-gray-400
            cursor-pointer
        "
                    >
                        Previous
                    </button>

                    <span className="font-semibold">
                        Page {page + 1} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded-lg
            disabled:bg-gray-400
            cursor-pointer
        "
                    >
                        Next
                    </button>

                </div>

            </div>
        </Layout>

    );
}

export default Products;