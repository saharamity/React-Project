
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FloatingLabel, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Swal from "sweetalert2";
import { TUser } from "../../Types/TUser";
import EditUserSchema from "../../Validations/EditUserSchema";

const UpdateUserDetails = () => {

    const [user, setUser] = useState<TUser>();
    const { id } = useParams<{ id: string }>();
    console.log(id);
    const nav = useNavigate();

    const getUserData = async () => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);
            setUser(res.data);
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 2000,
                toast: true,
                showCloseButton: true
            });
        };
    };


    const initialUserData = {
        name: {
            first: user?.name.first,
            middle: user?.name.middle,
            last: user?.name.last,
        },
        phone: user?.phone,
        image: {
            url: user?.image.url,
            alt: user?.image.alt,
        },
        address: {
            state: user?.address.state,
            country: user?.address.country,
            city: user?.address.city,
            street: user?.address.street,
            houseNumber: user?.address.houseNumber,
            zip: user?.address.zip
        },
    };


    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialUserData,
        mode: "onChange",
        resolver: joiResolver(EditUserSchema)
    });

    const onSubmit = async (form: typeof initialUserData) => {
        try {
            axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("token");
            await axios.put("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id, form);
            Swal.fire({
                title: "Done!",
                text: "You Updated your card details successfully",
                icon: "success",
                timerProgressBar: true,
                background: '#6d6d6d',
                color: '#ffffff',
                showConfirmButton: false,
                timer: 1000,
                showCloseButton: true
            });
            nav("/");
        } catch (error) {
            Swal.fire({
                title: "failed!",
                icon: "error",
                timerProgressBar: true,
                timer: 1000,
                showCloseButton: true
            });
        };
    };

    useEffect(() => {
        if (user) {
            reset(initialUserData);
        }
    }, [user, reset]);

    useEffect(() => {
        getUserData();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gradient-to-r from-blue-200 via-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 md:w-1/3">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white"> Editing User Details </h1>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <div className="flex flex-col w-1/2">
                            <FloatingLabel
                                label={"First Name"}
                                defaultValue={user?.name.first}
                                {...register("name.first")}
                                variant={"standard"}
                            />
                            <span className="text-sm text-red-800">{errors.name?.first?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"Middle Name"}
                                defaultValue={user?.name.middle}
                                {...register("name.middle")}
                                variant={"standard"}
                            />
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"Last Name"}
                                defaultValue={user?.name.last}
                                {...register("name.last")}
                                variant={"standard"}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"Image URL"}
                                defaultValue={user?.image.url}
                                {...register("image.url")}
                                variant={"standard"}
                            />
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"Image ALT"}
                                defaultValue={user?.image.alt}
                                {...register("image.url")}
                                variant={"standard"}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"State"}
                                defaultValue={user?.address.state}
                                {...register("address.state")}
                                variant={"standard"}
                            />
                        </div>
                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"Country"}
                                defaultValue={user?.address.country}
                                {...register("address.country")}
                                variant={"standard"}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"City"}
                                defaultValue={user?.address.city}
                                {...register("address.city")}
                                variant={"standard"}
                            />
                        </div>


                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"Street"}
                                defaultValue={user?.address.street}
                                {...register("address.street")}
                                variant={"standard"}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 m-auto">
                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"HouseNumber"}
                                defaultValue={user?.address.houseNumber}
                                {...register("address.houseNumber")}
                                variant={"standard"}
                            />
                            <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                        </div>

                        <div className="flex flex-col">
                            <FloatingLabel
                                label={"ZIP"}
                                defaultValue={user?.address.zip}
                                {...register("address.zip")}
                                variant={"standard"}
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={!isValid} className="m-auto w-[50%] bg-sky-400 mb-6 mt-6  dark:border-black
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">Update Changes</Button>
            </form>
        </div>
    )
};

export default UpdateUserDetails;