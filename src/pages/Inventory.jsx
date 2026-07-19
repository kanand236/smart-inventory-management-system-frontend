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

                <h1 className="text-3xl font-bold mb-6">
                    Inventory Management
                </h1>

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-2xl font-semibold mb-4">
                        Create Transaction
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <select
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
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
                            className="border p-3 rounded-lg"   
                        />

                        <br /><br />

                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
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
                            bg-blue-600
                            text-white
                            py-3
                            rounded-lg
                            hover:bg-blue-700
                            transition
                            "
                        >
                            Create Transaction
                        </button>

                    </form>
                </div>

                <hr />

                <div className="bg-white p-6 rounded-lg shadow mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Transaction History
                    </h2>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-2">ID</th>

                                <th className="p-2">Product</th>

                                <th className="p-2">Quantity</th>

                                <th className="p-2">Type</th>

                                <th className="p-2">Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                transactions.map(transaction => (

                                    <tr
                                        key={transaction.id}
                                        className="border-t"
                                    >

                                        <td className="p-2">
                                            {transaction.id}
                                        </td>

                                        <td className="p-2">
                                            {transaction.productName}
                                        </td>

                                        <td className="p-2">
                                            {transaction.quantity}
                                        </td>

                                        <td className="p-2">

                                            <span
                                                className={`
                                                        px-3 py-1 rounded text-white
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
        </Layout>
    );
}

export default Inventory;