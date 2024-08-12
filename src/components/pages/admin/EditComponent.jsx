/* eslint-disable react/prop-types */

const EditComponent = ({ producto, handleEditChange, handleEditSubmit, setEditingProduct }) => {
  const handleSubmit = (e) => {
      e.preventDefault();
      handleEditSubmit();
  };

  return (
      <div className="edit-form-container">
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={producto.name}
                      onChange={handleEditChange}
                      required
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                      type="number"
                      id="price"
                      name="price"
                      className="form-control"
                      value={producto.price}
                      onChange={handleEditChange}
                      required
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={producto.description}
                      onChange={handleEditChange}
                      required
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                      type="text"
                      id="category"
                      name="category"
                      className="form-control"
                      value={producto.category}
                      onChange={handleEditChange}
                      required
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="sizes" className="form-label">Sizes and Stock</label>
                  <textarea
                      id="sizes"
                      name="sizes"
                      className="form-control"
                      value={producto.sizes.map(sizeObj => `${sizeObj.size}, ${sizeObj.stock}`).join('\n')}
                      onChange={handleEditChange}
                      placeholder="Enter sizes in format: Size, Stock"
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="offer" className="form-label">Offer Percentage</label>
                  <input
                      type="number"
                      id="offer"
                      name="offer"
                      className="form-control"
                      value={producto.offer || ''}
                      onChange={handleEditChange}
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image URL</label>
                  <input
                      type="text"
                      id="image"
                      name="image"
                      className="form-control"
                      value={producto.image}
                      onChange={handleEditChange}
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="imageOne" className="form-label">Additional Image 1 URL</label>
                  <input
                      type="text"
                      id="imageOne"
                      name="imageOne"
                      className="form-control"
                      value={producto.imageOne}
                      onChange={handleEditChange}
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="imageTwo" className="form-label">Additional Image 2 URL</label>
                  <input
                      type="text"
                      id="imageTwo"
                      name="imageTwo"
                      className="form-control"
                      value={producto.imageTwo}
                      onChange={handleEditChange}
                  />
              </div>
              <button type="submit" className="btn btn-primary">Update Product</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
      </div>
  );
};

export default EditComponent;
