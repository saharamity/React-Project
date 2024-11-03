import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import axios from "axios";
import { Card } from "flowbite-react";
import { CiHeart, CiTrash, CiEdit, CiCirclePlus } from "react-icons/ci";
import Swal from "sweetalert2";

const MyCardPage = () => {
    const user = useSelector((state: TRootState) => state.UserSlice);
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector(
        (state: TRootState) => state.SearchSlice.search,
    );

    const getData = async () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
        const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards");
        setCards(res.data);
    };

    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const likeUnlikeCard = async (card: TCard) => {
        const res = await axios.patch(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards" + card._id,
        );
        if (res.status === 200) {
            Swal.fire({
                position: "top",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });

            const index = cards.indexOf(card);
            const ifLiked = cards[index].likes.includes(user.user!._id);
            const newCards = [...cards];
            if (ifLiked) {
                newCards[index].likes.splice(index);
            } else {
                newCards[index].likes.push(user.user!._id);
            }
            setCards(newCards);
        }
    };

    const deleteCard = async (card: TCard) => {
        try {
            const res = await axios.delete(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id,
            );
            const index = cards.indexOf(card);
            const newCards = [...cards];
            newCards.splice(index, 1);
            setCards(newCards);
            if (res) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (err) {
            Swal.fire({
                position: "top",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const isLikeCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user?._id);
        }
    };

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const navToCreate = () => {
        nav("/createCard");
    };

    const navToEdit = (id: string) => {
        nav("/updateCard/" + id);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-start gap-2 py-10 mb-10 bg-gradient-to-r from-blue-200 via-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
                <h1 className="mb-4 font-mono text-5xl text-center text-gray-800 dark:text-white">
                    My Cards
                </h1>
                <p className="mb-5 font-mono text-2xl text-center text-gray-700 dark:text-white">
                    These are the cards you created:
                </p>
                <p className="mb-5 font-mono text-xl text-center text-gray-700 dark:text-white">
                    To add your own business card please click on the add button
                </p>
            </div>

            <div className="fixed flex p-3 rounded-full shadow-md cursor-pointer right-10 top-40 bg-slate-500 hover:bg-slate-600 dark:bg-gray-800">
                <CiCirclePlus onClick={navToCreate} size={50} className="text-white" />
            </div>

            <div className="flex flex-wrap justify-center items-center w-[80vw] m-auto gap-8">
                {searchCards()!.map((item: TCard) => {
                    return (
                        <Card
                            key={item._id}
                            className="border border-gray-200 bg-white shadow-xl rounded-[20px] transition-all cursor-pointer hover:scale-[105%] hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <div className="relative overflow-hidden rounded-t-[20px]">
                                <img
                                    onClick={() => navToCard(item._id)}
                                    className="object-cover w-full h-[200px] transition-transform duration-300 hover:scale-[110%]"
                                    src={item.image.url}
                                    alt={item.image.alt}
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between h-[250px]">
                                <h5 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                                    {item.title}
                                </h5>
                                <h6 className="mb-2 text-sm text-center text-gray-600 dark:text-gray-400">
                                    {item.subtitle}
                                </h6>
                                <hr />
                                <p className="text-sm text-center text-gray-700 dark:text-gray-400">
                                    Phone: {item.phone}
                                    <br />
                                    Address: {item.address.country} {item.address.city}{" "}
                                    {item.address.street} {item.address.houseNumber}
                                </p>
                                <hr />
                                {user && user.user && (
                                    <div className="flex flex-row items-center justify-around mt-3">
                                        <CiHeart
                                            size={30}
                                            className="cursor-pointer"
                                            color={isLikeCard(item) ? "red" : "black"}
                                            onClick={() => likeUnlikeCard(item)}
                                        />
                                        <CiTrash
                                            size={30}
                                            className="text-red-600 cursor-pointer dark:text-red-400"
                                            onClick={() => deleteCard(item)}
                                        />
                                        <CiEdit
                                            size={30}
                                            className="text-blue-600 cursor-pointer dark:text-blue-400"
                                            onClick={() => navToEdit(item._id)}
                                        />
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default MyCardPage;
