import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { setToken } from "../../../utils/auth";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {

        const response = await fetch('http://localhost:3000/api/users/login', {
            method: "POST",
            body: JSON.stringify({ mail: data.mail, password: data.password }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await response.json();

        if (response.ok) {
            setToken(result.token);
            navigate('/'); // Redirigir al dashboard u otra página
        } else {
            console.error(result.error);
        }

    }

    return (
        <main className="loginSection">

            <form onSubmit={handleSubmit(onSubmit)} className="formLogin">
                {/* register your input into the hook by invoking the "register" function */}
                <input placeholder="mail" {...register("mail")} className="inputLogin" />

                {/* include validation with required or other standard HTML validation rules */}
                <input placeholder="contraseña" {...register("password", { required: true })} className="inputLogin" type="password" />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" className="btnLogin" />
            </form>
        </main>
    )
}
export default Login