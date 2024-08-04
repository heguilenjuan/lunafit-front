// components/EditComponent/EditComponent.js

// eslint-disable-next-line react/prop-types
const EditComponent = ({ producto, editedProducto, handleEditChange, handleEditSubmit, setEditingProduct }) => {

  const product = producto;
  const editedProduct = editedProducto;
  return (
    <div className="accordion-body">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditSubmit(product._id);
        }}
      >
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
          <label htmlFor="size"><b>Size</b> (comma separated)</label>
          <input
            type="text"
            id="size"
            name="size"
            value={editedProduct.size}
            onChange={handleEditChange}
            className="form-control"
          />
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
          <label htmlFor="stock"><b>Stock</b></label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={editedProduct.stock}
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
