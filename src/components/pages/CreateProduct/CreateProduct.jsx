import { useState } from 'react';
import { useForm } from 'react-hook-form';

//styles
import './CreateProduct.scss';
//component
import Spinner from '../../Spinner/Spinner';
import NavAdmin from '../admin/NavAdmin';

//utils
import { fetchData } from '../../../utils/api';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    const token = localStorage.getItem('token');

    const sizes = watch('sizes', []); // Watch sizes field to ensure it's updated
    const stocks = watch('stocks', []); // Watch stocks field to ensure it's updated

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('offer', data.offer || 0); // Default to 0 if not provided
        formData.append('description', data.description || ''); // Default to empty string if not provided

        // Convert sizes and stocks to the required format
        const sizesAndStock = sizes.map((size, index) => ({
            size: size,
            stock: stocks[index] || 0 // Default to 0 if stock is not provided
        }));

        // Add sizes as a single JSON string
        formData.append('sizes', JSON.stringify(sizesAndStock));

        if (data.image.length > 0) formData.append('image', data.image[0]);
        if (data.image1.length > 0) formData.append('imageOne', data.image1[0]);
        if (data.image2.length > 0) formData.append('imageTwo', data.image2[0]);

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
        <main className='section-create'>
            {loading ? <Spinner /> :
                <>
                    <NavAdmin />
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

                            <div className='size-stock-container'>
                                <label>Sizes and Stock</label>
                                {['S', 'M', 'L', 'XL', '1/2', '3/4'].map((size, index) => (
                                    <div key={size} className='size-stock-row'>
                                        <label>{size}</label>
                                        <input
                                            type="hidden"
                                            value={size}
                                            {...register(`sizes[${index}]`)}
                                        />
                                        <input
                                            placeholder={`Stock for ${size}`}
                                            type="number"
                                            {...register(`stocks[${index}]`, { min: 0 })}
                                            className='input'
                                        />
                                    </div>
                                ))}
                            </div>

                            <input
                                placeholder='Description'
                                {...register('description')}
                                className='input'
                            />
                            {errors.description && <p className='error'>{errors.description.message}</p>}

                            <input
                                placeholder='Offer'
                                {...register('offer')}
                                type="number"
                                className='input'
                            />
                            {errors.offer && <p className='error'>{errors.offer.message}</p>}

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
                </>
            }
       </main>
    );
};

export default CreateProduct;
