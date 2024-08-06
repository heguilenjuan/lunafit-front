import './Register.css';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchData } from '../../../../utils/api';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        setErrorMessage('');
        setSuccessMessage('');

        if (data.password !== data.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await fetchData('api/users/register', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage('Usuario creado exitosamente');
            reset();
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.message || 'Error de red: no se pudo conectar con el servidor');
        }
    };

    return (
        <main className='mainRegister'>
            <form onSubmit={handleSubmit(onSubmit)} className="formRegister">
                <h2 className="formTitle">Crear Cuenta</h2>
                
                <input
                    placeholder="Nombre"
                    {...register("firstName", {
                        required: 'El nombre es obligatorio',
                        minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                    })}
                    className="inputRegister"
                />
                {errors.firstName && <span className="errorText">{errors.firstName.message}</span>}

                <input
                    placeholder="Apellido"
                    {...register("lastName", {
                        required: 'El apellido es obligatorio',
                        minLength: { value: 2, message: 'El apellido debe tener al menos 2 caracteres' }
                    })}
                    className="inputRegister"
                />
                {errors.lastName && <span className="errorText">{errors.lastName.message}</span>}

                <input
                    placeholder="Email"
                    {...register("email", {
                        required: 'El email es obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'El email no es válido'
                        }
                    })}
                    className="inputRegister"
                />
                {errors.email && <span className="errorText">{errors.email.message}</span>}

                <input
                    placeholder="Contraseña"
                    {...register("password", {
                        required: 'La contraseña es obligatoria',
                        minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                    })}
                    className="inputRegister"
                    type="password"
                />
                {errors.password && <span className="errorText">{errors.password.message}</span>}

                <input
                    placeholder="Confirmar Contraseña"
                    {...register("confirmPassword", {
                        required: 'La confirmación de contraseña es obligatoria',
                        minLength: { value: 6, message: 'La confirmación de contraseña debe tener al menos 6 caracteres' }
                    })}
                    className="inputRegister"
                    type="password"
                />
                {errors.confirmPassword && <span className="errorText">{errors.confirmPassword.message}</span>}

                <input
                    placeholder="Dirección"
                    {...register("address", {
                        required: 'La dirección es obligatoria'
                    })}
                    className="inputRegister"
                />
                {errors.address && <span className="errorText">{errors.address.message}</span>}

                <input
                    placeholder="Ciudad"
                    {...register("city", {
                        required: 'La ciudad es obligatoria'
                    })}
                    className="inputRegister"
                />
                {errors.city && <span className="errorText">{errors.city.message}</span>}

                <input
                    placeholder="Código Postal"
                    {...register("postalCode", {
                        required: 'El código postal es obligatorio',
                        pattern: {
                            value: /^[0-9]{4,5}$/,
                            message: 'El código postal no es válido'
                        }
                    })}
                    className="inputRegister"
                />
                {errors.postalCode && <span className="errorText">{errors.postalCode.message}</span>}

                <input
                    placeholder="Teléfono"
                    {...register("phone", {
                        required: 'El teléfono es obligatorio',
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'El teléfono no es válido'
                        }
                    })}
                    className="inputRegister"
                />
                {errors.phone && <span className="errorText">{errors.phone.message}</span>}

                <button type="submit" className="btnRegister">Registrarse</button>
            </form>

            <div className="linkToLogin">
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </div>

            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
            {successMessage && <div className="successMessage">{successMessage}</div>}
        </main>
    );
};

export default Register;
