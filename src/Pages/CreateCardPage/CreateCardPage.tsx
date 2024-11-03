import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, FloatingLabel } from "flowbite-react";
import { CreateCardSchema } from "../../Validations/CreateCardSchema";

const CreateCardPage = () => {
    const initialData = {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        }
    }

    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema)
    });

    const onSubmit = async (form: typeof initialData) => {
        try {
            const res = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form,
            );
            if (res.status >= 200 && res.status < 300) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Thanks",
                    showConfirmButton: false,
                    timer: 1500
                });
                nav("/profile");
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Sorry something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        };
    };

    return (
        <>
            <div className="flex flex-col items-center justify-start gap-2 py-10 mb-10 bg-gradient-to-r from-blue-200 via-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
                <h1 className="mb-4 font-mono text-5xl text-center text-gray-800 dark:text-white">
                    Create Your Card
                </h1>
                <p className="mb-5 font-mono text-2xl text-center text-gray-700 dark:text-white">
                    Fill in the details below to create your business card:
                </p>
            </div>

            <div className="w-full m-auto mb-20 sm:w-4/5 lg:w-3/5 xl:w-2/5">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 rounded-lg shadow-lg bg-slate-100 dark:bg-gray-800">
                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Title"
                        {...register("title")}
                        color={errors.title ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.title?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Subtitle"
                        {...register("subtitle")}
                        color={errors.subtitle ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.subtitle?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Description"
                        {...register("description")}
                        color={errors.description ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.description?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Phone"
                        {...register("phone")}
                        color={errors.phone ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.phone?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Email"
                        {...register("email")}
                        color={errors.email ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.email?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Web"
                        {...register("web")}
                        color={errors.web ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.web?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Image URL"
                        {...register("image.url")}
                        color={errors.image?.url ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.image?.url?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Image Alt"
                        {...register("image.alt")}
                        color={errors.image?.alt ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.image?.alt?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="State"
                        {...register("address.state")}
                        color={errors.address?.state ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.address?.state?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Country"
                        {...register("address.country")}
                        color={errors.address?.country ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.address?.country?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="City"
                        {...register("address.city")}
                        color={errors.address?.city ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.address?.city?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="text"
                        variant="standard"
                        label="Street"
                        {...register("address.street")}
                        color={errors.address?.street ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.address?.street?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="number"
                        variant="standard"
                        label="House Number"
                        {...register("address.houseNumber")}
                        color={errors.address?.houseNumber ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>

                    <FloatingLabel className="text-2xl text-gray-700 dark:text-white"
                        type="number"
                        variant="standard"
                        label="Zip"
                        {...register("address.zip")}
                        color={errors.address?.zip ? "error" : "success"} />
                    <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>

                    <Button type="submit" disabled={!isValid}>Add Your Card</Button>
                </form>
            </div>
        </>
    );
};

export default CreateCardPage;
