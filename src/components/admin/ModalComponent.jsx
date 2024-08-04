// eslint-disable-next-line react/prop-types
const ModalComponent = ({ cancelDelete, confirmDelete }) => {
    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmación de Eliminación</h5>
                        <button type="button" className="btn-close" onClick={cancelDelete}></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de que deseas eliminar este producto?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;
