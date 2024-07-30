import { useEffect, useState } from "react";
import Card from "../Product/Card/Card";
import "./AllProduct.css";
import Filter from "./Filter/Filter";
import Spinner from "../Spinner/Spinner";


const AllProducts = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        color: [],
        size: [],
        category: []
    });


    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`https://backluna.vercel.app/api/product`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                if (data) {
                    setProducts(data);
                    setFilteredProducts(data); // Initialize filtered products
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const applyFilters = () => {
        let filtered = products;

        if (filters.color.length > 0) {
            filtered = filtered.filter((product) =>
                filters.color.includes(product.color)
            );
        }
        if (filters.size.length > 0) {
            filtered = filtered.filter((product) =>
                filters.size.includes(product.size)
            );
        }
        if (filters.category.length > 0) {
            filtered = filtered.filter((product) =>
                filters.category.includes(product.category)
            );
        }

        setFilteredProducts(filtered);
    };

    return (
        <>
            {loading ? <Spinner /> :
                <main className="containerAllProduct">

                    <div className="filterProducts">
                        <Filter filters={filters} setFilters={setFilters} />
                    </div>
                    <section className="allProductContainer">
                        {filteredProducts.map((product, index) => (
                            <Card key={index} data={product} />
                        ))}
                    </section>


                </main>
            }
        </>
    );
};

export default AllProducts;
