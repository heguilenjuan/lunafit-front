import './Register.css'
import { useForm } from "react-hook-form";
import { useState } from 'react';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://backluna.vercel.app/api/users/register', {
                method: "POST",
                body: JSON.stringify({ mail: data.mail, password: data.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const info = await response.json();

            if (response.ok) {
                setSuccessMessage('Usuario creado exitosamente');
                setErrorMessage('');
            } else {
                setErrorMessage(info.error || 'Error al crear el usuario');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Error de red: no se pudo conectar con el servidor');
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
