import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../Validations/LoginSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { userActions } from "../../Store/UserSlice";
import { decode } from "../../Services/tokenServices";



const LoginPage = () => {
    const dispatch = useDispatch()
    const nav = useNavigate();
    const initialData = {
        email: "",
        password: "",
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialData,
        mode: "onChange",
        resolver: joiResolver(LoginSchema)
    });

    const onSubmit = async (form: typeof initialData) => {
        try {
            const token = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login", form,);
            localStorage.setItem("token", token.data);
            const id = decode(token.data)._id;
            axios.defaults.headers.common['x-auth-token'] = token.data;
            const user = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);

            dispatch(userActions.login(user.data));

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Login Success",
                showConfirmButton: false,
                timer: 1500
            });

            nav("/home");
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Your Login Failed",
                showConfirmButton: false,
                timer: 1500
            });

        }
    }
    return (
        <div className="flex flex-col items-center justify-start min-h-screen gap-4 py-10 bg-gray-200 dark:bg-gray-800">
            <div className="w-full max-w-sm p-6 m-auto bg-white rounded-lg shadow-lg dark:bg-gray-900">
                <h1 className="mb-6 font-mono text-5xl text-center text-gray-800 dark:text-white">
                    Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FloatingLabel
                        type="email"
                        label="Email"
                        variant="standard"
                        {...register("email")}
                        color={errors.email ? "error" : "success"}
                        className="text-xl text-gray-700 dark:text-white"
                    />
                    <span className="text-sm text-red-500">{errors.email?.message}</span>

                    <FloatingLabel
                        type="password"
                        label="Password"
                        variant="standard"
                        {...register("password")}
                        color={errors.password ? "error" : "success"}
                        className="text-xl text-gray-700 dark:text-white"
                    />
                    <span className="text-sm text-red-500">{errors.password?.message}</span>

                    <Button type="submit" disabled={!isValid}>Login</Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;