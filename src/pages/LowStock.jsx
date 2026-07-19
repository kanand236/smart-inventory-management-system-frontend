import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Layout from "../components/Layout";

function LowStock() {

    const [products, setProducts] = useState([]);

    const fetchLowStockProducts = async () => {

        try {

            const response = await api.get(
                "/products/low-stock"
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchLowStockProducts();

    }, []);

    return (

        <Layout>
            <div>

                <h1 className="text-3xl font-bold mb-6">
                    Low Stock Alert
                </h1>

                <div className="bg-red-100 border border-red-300 p-4 rounded-lg mb-6">

                    <h2 className="text-xl font-semibold text-red-700">

                        Total Low Stock Products:
                        {products.length}

                    </h2>

                </div>

                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-2xl font-bold mb-4">

                        Low Stock Products

                    </h2>

                    <table className="w-full border">

                        <thead>

                            <tr className="bg-gray-200">

                                <th className="p-2">ID</th>

                                <th className="p-2">Product</th>

                                <th className="p-2">Current Stock</th>

                                <th className="p-2">Minimum Stock</th>

                                <th className="p-2">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.map(product => (

                                    <tr
                                        key={product.productId}
                                        className="border-t"
                                    >

                                        <td className="p-2">
                                            {product.productId}
                                        </td>

                                        <td className="p-2">
                                            {product.productName}
                                        </td>

                                        <td className="p-2">
                                            {product.quantity}
                                        </td>

                                        <td className="p-2">
                                            {product.minimumStock}
                                        </td>

                                        <td className="p-2">

                                            <span
                                                className="
                                bg-red-500
                                text-white
                                px-3
                                py-1
                                rounded
                            "
                                            >
                                                LOW STOCK
                                            </span>

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

export default LowStock;