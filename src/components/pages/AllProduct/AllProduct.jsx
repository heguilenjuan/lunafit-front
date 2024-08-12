import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/productsSlice";
import "./AllProduct.css";
import Card from '../../Card/Card';
import Filter from "./Filter/Filter";
import Spinner from "../../Spinner/Spinner";
import Pagination from '../AllProduct/Pagination/Pagination';

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const totalPages = useSelector((state) => state.products.totalPages);

    // Inicializa en 1
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        size: [],
        category: []
    });

    useEffect(() => {
        // Fetch products when currentPage or filters change
        dispatch(fetchProducts({ page: currentPage, filters }));
    }, [dispatch, currentPage, filters]);

    useEffect(() => {
        // Ajusta currentPage si es mayor que totalPages
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    useEffect(() => {
        // Reset currentPage to 1 if the filters change
        // Only set currentPage to 1 if the filters change and it's not the first page
        if (currentPage > 1) {
            setCurrentPage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handlePageChange = (page) => {
        if (page <= totalPages && page >= 1) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {productStatus === 'loading' && <Spinner />}
            {productStatus === 'succeeded' && (
                <main className="containerAllProduct">
                    <div className="filterSection">
                        <Filter filters={filters} setFilters={setFilters} />
                    </div>
                    <section className="allProductSection">
                        <div className="allProductContainer">
                            {products.map((product) => (
                                <Card key={product._id} data={product} />
                            ))}
                        </div>
                        <div className="paginationContainer">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </section>
                </main>
            )}
            {productStatus === 'failed' && <div>{error}</div>}
        </>
    );
};

export default AllProducts;
