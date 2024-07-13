import { useForm } from 'react-hook-form';
import './CreateProduct.css';

const CreateProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('category', data.category);
            formData.append('stock', data.stock);
            formData.append('offer', data.offer);
            formData.append('description', data.description);
            formData.append('image', data.image[0]); // Assuming 'image' field is a single file
            formData.append('imageOne', data.image1[0]); // Assuming 'image1' field is a single file
            formData.append('imageTwo', data.image2[0]); // Assuming 'image2' field is a single file

            const response = await fetch('http://localhost:3000/api/product', {
                method: 'POST',
                body: formData,
            })


            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                alert('Producto creado');
            }

            const result = await response.json();
            console.log('Product created:', result);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='containerForm'>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='boxForm' encType="multipart/form-data">

                <input
                    placeholder='Name'
                    {...register('name', { required: 'Product name is required' })}
                    className='input'
                />
                {errors.name && <p>{errors.name.message}</p>}

                <input
                    placeholder='Price'
                    type="number"
                    {...register('price', { required: 'Price is required', min: 0 })}
                    className='input'
                />
                {errors.price && <p>{errors.price.message}</p>}

                <input
                    placeholder='Category'
                    {...register('category', { required: 'Category is required' })}
                    className='input'
                />
                {errors.category && <p>{errors.category.message}</p>}

                <input
                    placeholder='Stock'
                    type="number"
                    {...register('stock', { min: 0 })}
                    className='input'
                />
                {errors.stock && <p>{errors.stock.message}</p>}

                <input
                    placeholder='Offer'
                    type="number"
                    {...register('offer', { min: 0 })}
                    className='input'
                />
                {errors.offer && <p>{errors.offer.message}</p>}

                <textarea
                    placeholder='Description'
                    {...register('description')}
                    className='input'
                />

                <input
                    type="file"
                    {...register('image', { required: 'Image file is required' })}
                    className='input'
                />
                {errors.image && <p>{errors.image.message}</p>}

                <input
                    type="file"
                    {...register('image1', { required: 'Image 1 file is required' })}
                    className='input'
                />
                {errors.image1 && <p>{errors.image1.message}</p>}

                <input
                    type="file"
                    {...register('image2')}
                    className='input'
                />

                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;
