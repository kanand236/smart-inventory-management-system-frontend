import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Layout from "../components/Layout";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const role = localStorage.getItem("role");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const response = await api.get("/category");

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const handleAddCategory = async (e) => {

        e.preventDefault();

        try {

            await api.post("/category", {
                name,
                description
            });

            setName("");
            setDescription("");

            fetchCategories();

            alert("Category Added Successfully");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error while adding category"
            );
        }
    };

    const handleDelete = async (id) => {

        try {

            await api.delete(`/category/${id}`);

            fetchCategories();

            alert("Category Deleted Successfully");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );
        }
    };

    return (
        <Layout>
            <div style={{ padding: "20px" }}>

                <h2>Category Management</h2>

                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Add Category
                    </h2>

                    {/* Form */}

                    <form onSubmit={handleAddCategory}>

                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 rounded w-full"
                        />

                        <br /><br />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 rounded w-full"
                        />

                        <br /><br />

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                        >
                            Add Category
                        </button>

                    </form>

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-2xl font-bold mb-4">
                            Category List
                        </h2>

                    </div>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-gray-200">

                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                categories.map(category => (

                                    <tr key={category.id}>

                                        <td>{category.id}</td>

                                        <td>{category.name}</td>

                                        <td>{category.description}</td>

                                        <td>
                                            {
                                                role === "ADMIN" && (
                                                    <button
                                                        onClick={() => handleDelete(category.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded "
                                                    >
                                                        Delete
                                                    </button>
                                                )
                                            }
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        </Layout>
    );
}

export default Categories;