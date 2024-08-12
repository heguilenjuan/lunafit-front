import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.css';
import { getRoleFromToken, setToken } from "../../../../utils/auth";
import { fetchData } from "../../../../utils/api";
import { useState } from "react";
import Spinner from "../../../Spinner/Spinner";
import EyeShow from "../../../../assets/icons/eye-open.svg";
import EyeClose from '../../../../assets/icons/eye-closed.svg';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);
        setServerError('');
    
        try {
            // Enviar solicitud de inicio de sesión
            const loginResult = await fetchData('api/users/login', {
                method: "POST",
                body: JSON.stringify({ mail: data.mail, password: data.password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Verificar si se recibió un token
            if (!loginResult.token) {
                throw new Error(loginResult.message || 'Mail o contraseña incorrectos.');
            }
    
            // Establecer el token y extraer datos del mismo
            const token = loginResult.token;
            setToken(token);
    
            const { userId } = getRoleFromToken(token);
    
            // Obtener datos del usuario
            const userData = await fetchData(`api/users/${userId}`, { method: 'GET' });
    
            // Almacenar datos del usuario en sessionStorage
            sessionStorage.setItem('userData', JSON.stringify(userData));
    
            // Navegar a la página principal
            navigate('/');
            window.location.reload();

        } catch (error) {
            setServerError(error.message || 'Ocurrió un error al iniciar sesión.');
        } finally {
            setLoading(false);
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

                        <div className="password-field">
                            <input
                                placeholder="Contraseña"
                                {...register("password", { required: "El campo contraseña es requerido" })}
                                className={`inputLogin ${errors.password ? 'error' : ''}`}
                                type={showPass ? "text" : "password"}
                            />
                            <img
                                src={showPass ? `${EyeShow}` : `${EyeClose}`} /* Cambia la ruta al ícono SVG según tu estructura */
                                alt="Toggle Visibility"
                                className="password-toggle"
                                onClick={() => setShowPass(!showPass)}
                                width={20}
                                height={20}
                            />
                        </div>

                        {errors.password && <span className="errorMessage">{errors.password.message}</span>}

                        <div className="divForm">
                            <NavLink to={'/forgot-password'} className='linkRegister'>Olvidé mi contraseña</NavLink>
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
