import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '../../Card/Card';
import "./AllProduct.css";
import Filter from "./Filter/Filter";
import Spinner from "../../Spinner/Spinner";
import { fetchProducts } from "../../../redux/productsSlice";

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const [filters, setFilters] = useState({
        size: [],
        category: []
    });
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = products;

            if (filters.category.length > 0) {
                filtered = filtered.filter((product) =>
                    filters.category.includes(product.category)
                );
            }

            if (filters.size.length > 0) {
                filtered = filtered.filter((product) =>
                    filters.size.some(size => product.size.includes(size))
                );
            }

            setFilteredProducts(filtered);
        };
        applyFilters();
    }, [filters, products]);

    return (
        <>
            {productStatus === 'loading' && <Spinner />}
            {productStatus === 'succeeded' && (
                <main className="containerAllProduct">
                    <div className="filterProducts">
                        <Filter filters={filters} setFilters={setFilters} />
                    </div>
                    <section className="allProductContainer">
                        {filteredProducts.map((product) => (
                            <Card key={product._id} data={product} />
                        ))}
                    </section>
                </main>
            )}
            {productStatus === 'failed' && <div>{error}</div>}
        </>
    );
};

export default AllProducts;
