import { useEffect } from "react";
import { useState } from "react"
import Card from '../Product/Card/Card'

import './AllProduct.css'
const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/product', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                console.log(data);
                if (data) {
                    setProducts(data);
                }
                // Muestra la respuesta del backend en la consola
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getProducts();
    }, [])

    return (
        <section className="allProductContainer">
            {products.map((product, index) => (
                <Card key={index} data={product} />
            ))}
        </section>
    )
}

export default AllProducts