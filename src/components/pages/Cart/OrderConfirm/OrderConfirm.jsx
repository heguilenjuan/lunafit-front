/* eslint-disable react/prop-types */
import './OrderConfirm.scss';

const OrderConfirmationModal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>¡Pedido Realizado Exitosamente!</h2>
                <p>Se ha enviado un correo electrónico con los detalles para seguir con el proceso de tu pedido. 
                Por favor, léelo atentamente y actualiza la página si es necesario.</p>
                <button onClick={onClose} className="modalButton">Aceptar</button>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;
