import { useForm } from 'react-hook-form';
import './CreateProduct.css';
import { useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import { fetchData } from '../../../utils/api';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Obtén el token de autenticación del almacenamiento local
    const token = localStorage.getItem('token'); // Cambia esto según cómo manejes la autenticación

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('stock', data.stock);
        formData.append('offer', data.offer);
        formData.append('description', data.description);
        formData.append('color', data.color);
        // Convertir los tamaños seleccionados en un array y agregarlos al formData uno por uno
        const sizes = Array.from(data.size); // Convertir a array
        sizes.forEach(size => formData.append('size[]', size)); // Usar 'size[]' para enviar como array
        formData.append('image', data.image[0]); // Assuming 'image' field is a single file
        formData.append('imageOne', data.image1[0]); // Assuming 'image1' field is a single file
        formData.append('imageTwo', data.image2[0]); // Assuming 'image2' field is a single file

        try {
            await fetchData('api/product', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setLoading(false);
            alert('Producto creado');
            reset();
        } catch (error) {
            setLoading(false);
            console.error('Error creating product:', error);
            setServerError(`Error al conectarse con el servidor - ${error}`);
        }
    };

    return (
        <>
            {loading ? <Spinner />
                :
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

                        <div className='size-container'>
                            <label>Category</label>
                            <select {...register('category')} className='input'>
                                <option value="calzas largas">Calzas largas</option>
                                <option value="bikers">Bikers</option>
                                <option value="calzas cortas">Calzas cortas</option>
                                <option value="tops">Tops</option>
                                <option value="medias">Medias</option>
                            </select>
                        </div>
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
