import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { setToken } from "../../../utils/auth";
import { useState } from "react";
import Spinner from "../../Spinner/Spinner";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when the request starts
        setServerError(''); // Clear any previous server error
        try {
            const response = await fetch('https://backluna.vercel.app/api/users/login', {
                method: "POST",
                body: JSON.stringify({ mail: data.mail, password: data.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                setToken(result.token);
                setLoading(false)
                navigate('/'); // Redirigir al dashboard u otra página
            } else {
                setLoading(false); // Set loading to false if there's an error
                setServerError(result.error);
            }
        } catch (error) {
            setLoading(false); // Set loading to false if there's an error
            setServerError('Error de conexión con el servidor.');
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

                        {serverError && <span className="serverError">{serverError}</span>}

                        <input type="submit" className="btnLogin" value="Iniciar Sesión" />
                    </form>
                </main>}
        </>

    );
};

export default Login;
