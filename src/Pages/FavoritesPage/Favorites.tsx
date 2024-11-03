import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import Swal from "sweetalert2";

const Favorites = () => {
    const user = useSelector((state: TRootState) => state.UserSlice);
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    const searchCards = () => {
        return cards
            .filter((item) => item.likes.includes(user.user!._id))
            .filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false;
    };

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const getData = async () => {
        const res = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        setCards(res.data);
    };

    const likeUnlikeCard = async (card: TCard) => {
        const res = await axios.patch(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id,
        );
        if (res.status === 200) {
            Swal.fire({
                position: "top",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-start gap-2 py-10 mb-10 bg-gradient-to-r from-blue-200 via-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
                <h1 className="mb-4 font-mono text-5xl text-center text-gray-800 dark:text-white">Favorites</h1>
                <p className="mb-5 font-mono text-2xl text-center text-gray-700 dark:text-white">
                    Your favorite cards
                </p>
                {user.isLoggedIn && (
                    <p className="mb-5 font-mono text-2xl text-center dark:text-white">
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
                                        color={isLikedCard(item) ? "red" : "black"}
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

export default Favorites;
