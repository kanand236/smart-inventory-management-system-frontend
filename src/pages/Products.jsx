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

                <h1>Product Management</h1>

                <h3>Total Products: {products.length}</h3>

                <h3>Total Categories: {categories.length}</h3>

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Add Product
                    </h2>

                    {/* Form Here */}

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-2 gap-4">

                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />

                            <br /><br />
                            <input
                                type="text"
                                name="sku"
                                placeholder="SKU"
                                value={formData.sku}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />

                            <br /><br />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />

                            <br /><br />

                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />

                            <br /><br />

                            <input
                                type="number"
                                name="minimumStock"
                                placeholder="Minimum Stock"
                                value={formData.minimumStock}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />



                        </div>


                        <br /><br />

                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
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

                        <br /><br />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                        >
                            Add Product
                        </button>

                    </form>

                </div>

                {/* Product List */}

                <hr />

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Product List
                    </h2>

                </div>

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-200">

                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.map(product => (

                                <tr key={product.id}>

                                    <td>{product.name}</td>

                                    <td>{product.sku}</td>

                                    <td>{product.price}</td>

                                    <td>{product.quantity}</td>

                                    <td>{product.categoryName}</td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button><br />

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>
                {/* Added here pagination */}

                <div>

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                    >
                        Previous
                    </button>

                    <span
                        style={{
                            margin: "0 15px"
                        }}
                    >
                        Page {page + 1}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                    >
                        Next
                    </button>

                </div>

            </div>
        </Layout>

    );
}

export default Products;