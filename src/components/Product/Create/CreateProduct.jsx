import { useForm } from 'react-hook-form';
import './CreateProduct.css';
import { useState } from 'react';
import Spinner from '../../Spinner/Spinner';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Obtén el token de autenticación del almacenamiento local
    const token = localStorage.getItem('token'); // Cambia esto según cómo manejes la autenticación

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when the request starts
        setServerError(''); // Clear any previous server error
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('stock', data.stock);
            formData.append('offer', data.offer);
            formData.append('description', data.description);
            formData.append('color', data.color);
            formData.append('size', JSON.stringify(data.size)); // Assuming 'size' is an array
            formData.append('image', data.image[0]); // Assuming 'image' field is a single file
            formData.append('imageOne', data.image1[0]); // Assuming 'image1' field is a single file
            formData.append('imageTwo', data.image2[0]); // Assuming 'image2' field is a single file

            const response = await fetch('https://backluna.vercel.app/api/product', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the token to the headers
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setLoading(false); // Set loading to false when the request finishes
            alert('Producto creado');
            console.log('Product created:', result);
        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            console.error('Error creating product:', error);
            setServerError('Error creating product');
        }
    };

    return (
        <>
            {loading ? <Spinner /> : 
                <div className='containerForm'>
                    <h1>Create Product</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='boxForm' encType="multipart/form-data">

                        <input
                            placeholder='Name'
                            {...register('name', { required: 'Product name is required' })}
                            className='input'
                        />
                        {errors.name && <p className='error'>{errors.name.message}</p>}

                        <input
                            placeholder='Price'
                            type="number"
                            {...register('price', { required: 'Price is required', min: 0 })}
                            className='input'
                        />
                        {errors.price && <p className='error'>{errors.price.message}</p>}

                        <input
                            placeholder='Category'
                            {...register('category', { required: 'Category is required' })}
                            className='input'
                        />
                        {errors.category && <p className='error'>{errors.category.message}</p>}

                        <input
                            placeholder='Stock'
                            type="number"
                            {...register('stock', { min: 0 })}
                            className='input'
                        />
                        {errors.stock && <p className='error'>{errors.stock.message}</p>}

                        <input
                            placeholder='Offer'
                            type="number"
                            {...register('offer', { min: 0 })}
                            className='input'
                        />
                        {errors.offer && <p className='error'>{errors.offer.message}</p>}

                        <textarea
                            placeholder='Description'
                            {...register('description')}
                            className='input'
                        />

                        <input
                            placeholder='Color'
                            {...register('color', { required: 'Color is required' })}
                            className='input'
                        />
                        {errors.color && <p className='error'>{errors.color.message}</p>}

                        <div className='size-container'>
                            <label>Size (select multiple)</label>
                            <select {...register('size')} multiple className='input'>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>

                        <input
                            type="file"
                            {...register('image', { required: 'Image file is required' })}
                            className='input'
                        />
                        {errors.image && <p className='error'>{errors.image.message}</p>}

                        <input
                            type="file"
                            {...register('image1', { required: 'Image 1 file is required' })}
                            className='input'
                        />
                        {errors.image1 && <p className='error'>{errors.image1.message}</p>}

                        <input
                            type="file"
                            {...register('image2')}
                            className='input'
                        />

                        <button type="submit">Create Product</button>
                        {serverError && <p className='error'>{serverError}</p>}
                    </form>
                </div>
            }
        </>
    );
};

export default CreateProduct;
