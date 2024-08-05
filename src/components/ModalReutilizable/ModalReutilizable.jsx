import './ModalReutilizable.css';
import CloseSvg from '../../assets/icons/close.svg'

// eslint-disable-next-line react/prop-types
const ModalReutilizable = ({ imageUrl, altText, closeModal }) => {
    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn" onClick={closeModal}>
                            <img src={CloseSvg} alt="close svg" width={25} height={25} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <img src={imageUrl} alt={altText} className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalReutilizable;
