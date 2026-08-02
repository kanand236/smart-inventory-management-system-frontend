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
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Category Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage all product categories here.
                    </p>

                </div>

                <div className="
                bg-white
        rounded-xl
        shadow-md
        hover:shadow-lg
        transition
        duration-300
        p-6
        mb-8"
                >

                    <h2 className="text-2xl font-bold mb-4">
                        Add Category
                    </h2>

                    {/* Form */}

                    <form onSubmit={handleAddCategory}>

                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
        "
                            />

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
        "
                            />

                            <button
                                type="submit"
                                className="
            w-full
            sm:w-auto
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-lg
            transition
            cursor-pointer
        "
                            >
                                Add Category
                            </button>

                        </div>

                    </form>

                    <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                        <h2 className="text-2xl font-bold mb-4">
                            Category List
                        </h2>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="min-w-full border border-gray-300 rounded-lg">

                            <thead>

                                <tr className="bg-gray-100 text-left">

                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    categories.map(category => (

                                        <tr key={category.id}>

                                            <td className="px-4 py-3 border-t">{category.id}</td>

                                            <td className="px-4 py-3 border-t">{category.name}</td>

                                            <td className="px-4 py-3 border-t">{category.description}</td>

                                            <td>
                                                {
                                                    role === "ADMIN" && (
                                                        <button
                                                            onClick={() => handleDelete(category.id)}
                                                            className="
                                                            bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-lg
transition
cursor-pointer
ssss
                                                            "
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

            </div>
        </Layout>
    );
}

export default Categories;