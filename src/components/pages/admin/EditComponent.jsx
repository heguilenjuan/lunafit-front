/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const EditComponent = ({ producto, editedProducto, handleEditChange, handleEditSubmit, setEditingProduct }) => {

  const editedProduct = editedProducto;

  // Crear un estado para manejar el stock por tamaño
  const [stockBySize, setStockBySize] = useState({});

  useEffect(() => {
    // Inicializar stockBySize con los valores del producto cuando el componente se monta
    const initialStockBySize = {};
    producto.sizes.forEach(({ size, stock }) => {
      initialStockBySize[size] = stock;
    });
    setStockBySize(initialStockBySize);
  }, [producto.sizes]);

  const handleStockChange = (size, value) => {
    setStockBySize(prevStock => ({
      ...prevStock,
      [size]: Number(value), // Asegurarse de que el valor sea numérico
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Añadir stockBySize al objeto editedProduct antes de enviarlo
    handleEditSubmit({ ...editedProduct, sizes: Object.keys(stockBySize).map(size => ({ size, stock: stockBySize[size] })) });
  };

  return (
    <div className="accordion-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><b>Name</b></label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price"><b>Price</b></label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description"><b>Description</b></label>
          <textarea
            id="description"
            name="description"
            value={editedProduct.description}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="size"><b>Sizes</b></label>
          {['S', 'M', 'L', 'XL', '1/2', '3/4'].map(size => (
            <div key={size}>
              <label>{size}</label>
              <input
                type="number"
                name={`stock-${size}`}
                value={stockBySize[size] || 0} // Usar el valor de stockBySize para cada tamaño
                onChange={(e) => handleStockChange(size, e.target.value)}
                className="form-control"
                placeholder={`Stock for ${size}`}
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="category"><b>Category</b></label>
          <input
            type="text"
            id="category"
            name="category"
            value={editedProduct.category}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="offer"><b>Offer</b></label>
          <input
            type="text"
            id="offer"
            name="offer"
            value={editedProduct.offer}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image"><b>Image URL</b></label>
          <input
            type="text"
            id="image"
            name="image"
            value={editedProduct.image}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageOne"><b>Image One URL</b></label>
          <input
            type="text"
            id="imageOne"
            name="imageOne"
            value={editedProduct.imageOne}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageTwo"><b>Image Two URL</b></label>
          <input
            type="text"
            id="imageTwo"
            name="imageTwo"
            value={editedProduct.imageTwo}
            onChange={handleEditChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditingProduct(null)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
