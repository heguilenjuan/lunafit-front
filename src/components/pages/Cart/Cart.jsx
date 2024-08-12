/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { fetchData } from "../../../utils/api";
import { getToken } from "../../../utils/auth";
import "./Cart.css";
import Trash from '../../../assets/icons/trash.svg';
import Edit from '../../../assets/icons/edit.svg';

const Cart = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingItemId, setEditingItemId] = useState(null);
    const [newQuantity, setNewQuantity] = useState({});
    const [refresh, setRefresh] = useState(false); // Estado para forzar actualización
    const { cartId } = useParams();
    const token = getToken();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const result = await fetchData(`api/cart/${cartId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (result) {
                    setProduct(result);
                } else {
                    console.error('Cart data not received');
                    setProduct({ items: [] }); // Establece un valor predeterminado para evitar errores
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
                setProduct({ items: [] }); // Establece un valor predeterminado para evitar errores
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, [cartId, token, refresh]); // Dependencia en `refresh` para actualizar

    const handleRemoveItem = async (itemId, size) => {
        try {
            const result = await fetchData('api/cart', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, size })
            });
            if (result) {
                console.log('Item Eliminado');
                setRefresh(prev => !prev); // Forzar actualización
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuantityChange = (itemId, quantity) => {
        setNewQuantity((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: quantity,
        }));
    };

    const handleUpdateQuantity = async (itemId) => {
        const quantity = newQuantity[itemId];

        if (quantity > 0) {
            try {
                const result = await fetchData('api/cart', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        itemId,
                        quantity
                    })
                });
                if (result) {
                    console.log('Cantidad actualizada');
                    setRefresh(prev => !prev); // Forzar actualización
                    setEditingItemId(null); // Salir del modo de edición
                }
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    };

    const handlePrice = (price, offer) => {
        const calculate = price - ((offer * price) / 100);
        return Math.round(calculate);
    };

    const handleTotalPrice = () => {
        let totalPrice = 0;
        if (product && product.items) {
            product.items.forEach(item => {
                const price = item.productId.offer
                    ? handlePrice(item.productId.price, item.productId.offer)
                    : item.productId.price;
                totalPrice += price * item.quantity;
            });
        }
        return totalPrice;
    };

    const handleCompleteOrder = async () => {
        const totalPrice = handleTotalPrice(); // Calcula el total del precio
        try {
            const result = await fetchData('api/createOrder', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId: product._id, // Enviar el ID del carrito o cualquier otro dato necesario
                    total: totalPrice, // Incluye el total del precio
                    items: product.items.map(item => ({
                        productId: item.productId._id,
                        quantity: item.quantity,
                        size: item.size,
                    })) // Incluye los detalles de los productos
                })
            });
            if (result) {
                console.log('Orden creada exitosamente');
                // Aquí puedes redirigir al usuario o mostrar un mensaje de confirmación
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="cart-container">
            <h3 className="cart-title">Carrito de compras</h3>
            {product && product.items.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {product.items.map(item => (
                            <li key={item._id} className="cart-item">
                                <div className="item-details">
                                    <h2 className="item-name">{item.productId.name}</h2>
                                    <p className="item-size">Talle: {item.size}</p>
                                    <p className="item-stock">Stock disponible: {item.productId.sizes.find(sizeObj => sizeObj.size === item.size)?.stock || 'No disponible'}</p>
                                    {editingItemId === item._id ? (
                                        <div className="box-quantity">
                                            <input
                                                type="number"
                                                value={newQuantity[item._id] || item.quantity}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                            />
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleUpdateQuantity(item._id)}
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="box-quantity">
                                            <p className="item-quantity">Cantidad: {item.quantity}</p>
                                            {/* 
                                            <div
                                                onClick={() => setEditingItemId(item._id)}
                                            >
                                                <img src={Edit} alt="edit svg" width={18} height={18} />
                                            </div>
                                            */}
                                        </div>
                                    )}

                                    {item.productId.offer ? (
                                        <>
                                            <p className="item-price">Precio: ${item.productId.price}</p>
                                            <p className="item-price">Precio en Oferta: ${handlePrice(item.productId.price, item.productId.offer)}</p>
                                            <p className="item-price">Total por producto: ${handlePrice(item.productId.price, item.productId.offer) * item.quantity}</p>
                                        </>
                                    ) : (
                                        <p className="item-price">Total por producto: ${item.productId.price * item.quantity}</p>
                                    )}
                                </div>
                                <button
                                    className="remove-item-button btn"
                                    onClick={() => handleRemoveItem(item._id, item.size)}
                                >
                                    <img src={Trash} alt="Trash icon" width={20} height={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="cart-total">Total: ${handleTotalPrice()}</h3>
                    <button
                        className="complete-order-button btn btn-primary"
                        onClick={handleCompleteOrder}
                    >
                        Realizar el pedido
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
