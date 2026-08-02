import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        const response =
            await api.get("/dashboard");

        setData(response.data);
    };

    return (

        <Layout>
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome to Smart Inventory Management System
                </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg transition duration-300
                cursor-pointer
                ">

                    <h2 className="text-gray-500 text-lg font-medium">
                        Total Products
                    </h2>

                    <p className="text-5xl font-bold text-blue-600 mt-3">
                        {data.totalProducts}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-gray-500 text-lg font-medium">
                        Total Categories
                    </h2>

                    <p className="text-5xl font-bold text-blue-600 mt-3">
                        {data.totalCategories}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-gray-500 text-lg font-medium">
                        Total Transactions
                    </h2>

                    <p className="text-5xl font-bold text-blue-600 mt-3">
                        {data.totalTransactions}
                    </p>

                </div>

            </div>
        </Layout >

    );
}

export default Dashboard;