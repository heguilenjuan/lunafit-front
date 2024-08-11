import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import './Login.css';
import { getRoleFromToken, setToken } from "../../../../utils/auth";
import { fetchData } from "../../../../utils/api";
import { useState } from "react";
import Spinner from "../../../Spinner/Spinner";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../../../redux/userSlice";
import EyeShow from "../../../../assets/icons/eye-open.svg";
import EyeClose from '../../../../assets/icons/eye-closed.svg';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);

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

            if (!result.token) {
                throw new Error(result.message || 'Mail o contraseña incorrectos.');
            }

            setToken(result.token);
            const { userId } = getRoleFromToken(result.token);
            dispatch(fetchUserData(userId));

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

                        <div className="password-field">
                            <input
                                placeholder="Contraseña"
                                {...register("password", { required: "El campo contraseña es requerido" })}
                                className={`inputLogin ${errors.password ? 'error' : ''}`}
                                type={showPass ? "text" : "password"}
                            />
                            <img
                                src={showPass ? `${ EyeShow }` : `${ EyeClose }`} /* Cambia la ruta al ícono SVG según tu estructura */
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
