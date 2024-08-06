import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.css';
import { setToken } from "../../../../utils/auth";
import { fetchData } from "../../../../utils/api";
import { useState } from "react";


import Spinner from "../../../Spinner/Spinner";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
        try {
            const result = await fetchData('api/users/login', {
                method: "POST",
                body: JSON.stringify({ mail: data.mail, password: data.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verificar si la respuesta del servidor contiene un error
            if (!result.token) {
                throw new Error(result.message || 'mail o contraseña incorrectos.');
            }

            setToken(result.token);
            setLoading(false);
            navigate('/');

        } catch (error) {
            setLoading(false);
            setServerError(error.message || 'Ocurrió un error al iniciar sesión.');
        }
    };

    return (
        <>
            {loading ? <Spinner />
                :
                <main className="loginSection">
                    <form onSubmit={handleSubmit(onSubmit)} className="formLogin">
                        <input
                            placeholder="Mail"
                            {...register("mail", { required: "El campo mail es requerido" })}
                            className={`inputLogin ${errors.mail ? 'error' : ''}`}
                        />
                        {errors.mail && <span className="errorMessage">{errors.mail.message}</span>}

                        <input
                            placeholder="Contraseña"
                            {...register("password", { required: "El campo contraseña es requerido" })}
                            className={`inputLogin ${errors.password ? 'error' : ''}`}
                            type="password"
                        />
                        {errors.password && <span className="errorMessage">{errors.password.message}</span>}

                       <div className="divForm">
                        <NavLink to={'/forgot-password'} className='linkRegister' >Olvide mi contraseña</NavLink> 
                        <NavLink to={'/register'} className='linkRegister'>Registrarse</NavLink> 
                        </div>
                        {serverError && <span className="serverError">{serverError}</span>}
                        <input type="submit" className="btnLogin" value="Iniciar Sesión" />
                       
                    </form>
                </main>}
        </>
    );
};

export default Login;
