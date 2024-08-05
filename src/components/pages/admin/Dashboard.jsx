import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, updateProduct } from '../../../redux/productsSlice';
import './Dashboard.css';
import Spinner from '../../Spinner/Spinner';
import EditIcon from '../../../assets/icons/edit.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import NavAdmin from './NavAdmin';
import ModalComponent from './ModalComponent';
import EditComponent from './EditComponent';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: '',
    description: '',
    size: '',
    category: '',
    offer: '',
    stock: '',
    image: '',
    imageOne: '',
    imageTwo: ''
  });

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
    dispatch(deleteProduct(productToDelete))
      .unwrap()
      .then(() => {
        setShowConfirm(false);
        setProductToDelete(null);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        setShowConfirm(false);
        setProductToDelete(null);
      });
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      description: product.description || '',
      size: product.size.join(',') || '',
      category: product.category || '',
      offer: product.offer || '',
      stock: product.stock || '',
      image: product.image || '',
      imageOne: product.imageOne || '',
      imageTwo: product.imageTwo || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditSubmit = (productId) => {
    const updatedProduct = {
      ...editedProduct,
      size: editedProduct.size.split(',').map(s => s.trim())
    };

    dispatch(updateProduct({ id: productId, ...updatedProduct }))
      .unwrap()
      .then(() => {
        setEditingProduct(null);
        dispatch(fetchProducts()); // Refresca la lista de productos
        // handleDelete(id) // Esta línea parece incorrecta, puede ser removida
      })
      .catch((error) => {
        console.error('Error updating product:', error.message); // Imprime el mensaje de error
      });
  };

  return (
    <div className="dashboard-container">
      <NavAdmin />
      {productStatus === 'loading' && <Spinner />}
      {productStatus === 'succeeded' && (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <div className="product-content">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">Precio: <b>${product.price}</b></p>
                  <p className="product-stock">Stock: <b>{product.stock}</b></p>
                  <p>Descuento: <b>{product.offer}</b></p>
                  <div className='product-size'>
                    <p>Talles:</p>
                    <div className='sizes'>
                      {product.size.map((item, index) => (
                        <span key={index}><b>{item}</b></span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="product-actions">
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn"
                  >
                    <img src={EditIcon} alt="Edit" className="icon" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn"
                  >
                    <img src={DeleteIcon} alt="Delete" className="icon" />
                  </button>
                </div>
              </div>
              {editingProduct === product._id && (
                <EditComponent
                  producto={product}
                  editedProducto={editedProduct}
                  handleEditChange={handleEditChange}
                  handleEditSubmit={handleEditSubmit}
                  setEditingProduct={setEditingProduct}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {productStatus === 'failed' && <div>{error}</div>}
      {showConfirm && (
        <ModalComponent cancelDelete={cancelDelete} confirmDelete={confirmDelete} />
      )}
    </div>
  );
};

export default Dashboard;
