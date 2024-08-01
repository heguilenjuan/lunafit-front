import './Register.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../utils/api';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            await fetchData('api/users/register', {
                method: "POST",
                body: JSON.stringify({ mail: data.mail, password: data.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Usuario creado exitosamente');
            reset();
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.message || 'Error de red: no se pudo conectar con el servidor');
            setSuccessMessage('');
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)} className="formLogin">
                <input
                    placeholder="Email"
                    {...register("mail", { required: 'El mail es obligatorio' })}
                    className="inputLogin"
                />
                {errors.username && <span>{errors.username.message}</span>}

                <input
                    placeholder="contraseña"
                    {...register("password", { required: 'La contraseña es obligatoria' })}
                    className="inputLogin"
                    type="password"
                />
                {errors.password && <span>{errors.password.message}</span>}

                <input type="submit" className="btnLogin" />
            </form>

            {errorMessage && <div className="error">{errorMessage}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </main>
    )
}

export default Register;
