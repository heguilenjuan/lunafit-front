import { useForm } from "react-hook-form";
import './Login.css'
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => console.log(data)

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