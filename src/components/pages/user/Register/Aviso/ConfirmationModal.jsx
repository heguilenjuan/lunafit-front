/* eslint-disable react/prop-types */
import './ConfirmationModal.scss';

const ConfirmationModal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h2>¡Registro Exitoso!</h2>
                <p>Revisa tu correo electrónico para confirmar tu cuenta. 
                Recuerda revisar también la carpeta de spam.</p>
                <button onClick={onClose} className="modalButton">Aceptar</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
