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
            <h1 className="text-3xl font-bold mb-5 mt-10">
                Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-gray-500">
                        Total Products
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.totalProducts}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-gray-500">
                        Total Categories
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.totalCategories}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-gray-500">
                        Total Transactions
                    </h2>

                    <p className="text-4xl font-bold">
                        {data.totalTransactions}
                    </p>

                </div>

            </div>
        </Layout>

    );
}

export default Dashboard;