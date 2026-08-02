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

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Low Stock Alert
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Monitor products that are below the minimum stock level.
                    </p>

                </div>

                <div className="bg-red-50 border border-red-300 rounded-xl p-6 mb-8 shadow-sm">

                    <h2 className="text-xl md:text-2xl font-bold text-red-600">

                        Total Low Stock Products:
                        {products.length}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-2xl font-bold mb-4">

                        Low Stock Products

                    </h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg">

                            <thead>

                                <tr className="bg-gray-100 text-left">

                                    <th className="px-4 py-3">ID</th>

                                    <th className="px-4 py-3">Product</th>

                                    <th className="px-4 py-3">Current Stock</th>

                                    <th className="px-4 py-3">Minimum Stock</th>

                                    <th className="px-4 py-3">Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    products.length > 0 ? (

                                        products.map(product => (

                                            <tr
                                                key={product.productId}
                                                className="border-t"
                                            >

                                                <td className="px-4 py-3">
                                                    {product.productId}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {product.productName}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {product.quantity}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {product.minimumStock}
                                                </td>

                                                <td className="px-4 py-3">

                                                    <span
                                                        className="
                        bg-red-500
                        text-white
                        px-4
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        "
                                                    >
                                                        LOW STOCK
                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center py-6 text-gray-500"
                                            >
                                                No Low Stock Products Found
                                            </td>

                                        </tr>

                                    )
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default LowStock;