import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import axios from "axios";
import { Card } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import Swal from "sweetalert2";

const HomePage = () => {
    const user = useSelector((state: TRootState) => state.UserSlice);
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector(
        (state: TRootState) => state.SearchSlice.search
    );

    const getData = async () => {
        const res = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
        );
        setCards(res.data);
    };

    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const likeUnlikeCard = async (card: TCard) => {
        const res = await axios.patch(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id
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

    const isLikeCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user?._id);
        }
    };

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-start gap-2 py-10 mb-10 bg-gradient-to-r from-blue-200 via-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900">
                <h1 className="mb-4 font-mono text-5xl text-center text-gray-800 dark:text-white dark:to-black">
                    Welcome to the Business Card Hub
                </h1>
                <p className="font-mono text-xl text-center text-gray-700 dark:text-white">
                    Find or publish a wide variety of business cards. Sign in to like and
                    save your favorites.
                </p>
                {user.isLoggedIn && (
                    <p className="mt-5 text-lg text-gray-700 dark:text-white">
                        Welcome {user?.user?.name.first + " " + user.user?.name.last}
                    </p>
                )}
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
                                    <CiHeart
                                        size={30}
                                        className="m-auto cursor-pointer"
                                        color={isLikeCard(item) ? "red" : "black"}
                                        onClick={() => likeUnlikeCard(item)}
                                    />
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

        </>
    );
};

export default HomePage;
