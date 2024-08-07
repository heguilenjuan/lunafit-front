import { useParams } from "react-router-dom"
const Cart = () => {
    const {userId} = useParams();

    console.log(userId);
    return (
        <div>CARRITO</div>
    )
}

export default Cart