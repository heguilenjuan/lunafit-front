import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../redux/productsSlice';
import './Dashboard.css';
import Spinner from '../Spinner/Spinner';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete.svg';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(productToDelete));
    setShowConfirm(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className="dashboard-container">
      <nav>
        <ul className='listDashboard'>
          <li>
            <Link to="/dashboard" className="btn btn-primary">
              Panel de control
            </Link>
          </li>
          <li>
            <Link to="/create-product" className="btn btn-primary">
              Crear Producto
            </Link>
          </li>
        </ul>
      </nav>

      {productStatus === 'loading' && <Spinner />}
      {productStatus === 'succeeded' && (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">${product.price}</p>
              </div>
              <div className="product-actions">
                <Link to={`/edit-product/${product._id}`} className="btn btn-secondary">
                  <img src={EditIcon} alt="Edit" className="icon" />
                </Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                  <img src={DeleteIcon} alt="Delete" className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {productStatus === 'failed' && <div>{error}</div>}

      {/* Confirmation Modal */}
      {showConfirm && (
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
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
