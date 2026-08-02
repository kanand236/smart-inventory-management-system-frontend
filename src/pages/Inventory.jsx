import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Layout from "../components/Layout";

function Inventory() {

    const [products, setProducts] = useState([]);

    const [transactions, setTransactions] = useState([]);

    const [formData, setFormData] = useState({
        productId: "",
        quantity: "",
        type: ""
    });

    useEffect(() => {
        fetchProducts();
        fetchTransactions();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    // Fetch Transactions

    const fetchTransactions = async () => {

        try {

            const response = await api.get(
                "/inventory/transactions"
            );

            setTransactions(response.data);

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

            const response = await api.post(
                "/inventory/transaction",
                formData
            );

            fetchTransactions();
            fetchProducts();

            alert("Transaction Created Successfully");

            console.log(response.data);

            setFormData({
                productId: "",
                quantity: "",
                type: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Transaction Failed"
            );
        }
    };

    return (
        <Layout>
            <div>

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Inventory Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage stock transactions and inventory movement.
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-2xl font-semibold mb-4">
                        Create Transaction
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        <select
                            name="productId"
                            value={formData.productId}
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
                                Select Product
                            </option>

                            {
                                products.map(product => (

                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}
                                    </option>

                                ))
                            }

                        </select>

                        <br /><br />

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

                        <br /><br />

                        <select
                            name="type"
                            value={formData.type}
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
                                Select Type
                            </option>

                            <option value="STOCK_IN">
                                STOCK_IN
                            </option>

                            <option value="STOCK_OUT">
                                STOCK_OUT
                            </option>

                            <option value="SALE">
                                SALE
                            </option>

                        </select>

                        <br /><br />

                        <button
                            type="submit"
                            className="
                            md:col-span-2
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
                            Create Transaction
                        </button>

                    </form>
                </div>

                <hr />

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Transaction History
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg">

                            <thead>

                                <tr className="bg-gray-100 text-left">

                                    <th className="px-4 py-3">ID</th>

                                    <th className="px-4 py-3">Product</th>

                                    <th className="px-4 py-3">Quantity</th>

                                    <th className="px-4 py-3">Type</th>

                                    <th className="px-4 py-3">Time</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    transactions.map(transaction => (

                                        <tr
                                            key={transaction.id}
                                            className="border-t"
                                        >

                                            <td className="px-4 py-3 border-t">
                                                {transaction.id}
                                            </td>

                                            <td className="px-4 py-3 border-t">
                                                {transaction.productName}
                                            </td>

                                            <td className="px-4 py-3 border-t">
                                                {transaction.quantity}
                                            </td>

                                            <td className="px-4 py-3 border-t whitespace-nowrap">

                                                <span
                                                    className={`
                                                        px-4 py-1 rounded-full text-sm font-semibold text-white rounded text-white
                                                        ${transaction.type === "STOCK_IN"
                                                            ? "bg-green-500"
                                                            : transaction.type === "STOCK_OUT"
                                                                ? "bg-red-500"
                                                                : "bg-yellow-500"
                                                        }
                                            `}
                                                >
                                                    {transaction.type}
                                                </span>

                                            </td>

                                            <td className="p-2">
                                                {transaction.time}
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

export default Inventory;