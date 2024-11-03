import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";


const CardDetails = () => {
    const [card, setCard] = useState<TCard>();
    const { id } = useParams<{ id: string }>();
    const { VITE_GOOGLE_MAPS_API_KEY: Key } = import.meta.env;
    console.log(Key);


    const getData = async () => {
        const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/' + id,);
        setCard(res.data);
    }



    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="flex flex-col font-mono justify-start items-center mb-4 h-[100vh]p - 8 md: h - [1000px]">
            <h1 className="h-[15vh] overflow-hidden text-3xl mt-20">{card && card!.title!}</h1>
            <div className="flex flex-col justify-center items-center rounded-lg border border-violet-300 p-4 shadow-xl shadow-slate-800 md:w-[30vw]">
                <h1 className="m-auto h-[10vh] overflow-hidden truncate text-2xl">{card && card!.subtitle!}</h1>
                <img src={card?.image.url} alt={card?.image.alt} className="object-contain m-auto border rounded-lg shadow-xl h-3/4 border-violet-300 shadow-slate-600 dark:shadow-slate-500" />
                <p className="m-auto mt-5 h-[10vh] overflow-auto text-sm">{card && card!.description!}</p>
                <p className="text-blue-500 cursor-pointer md:text-black hover:text-blue-500">Email: {card && card!.email!}</p>
                <p className="text-blue-500 cursor-pointer md:text-black hover:text-blue-500">Phone: {card && card!.phone!}</p>
                <p className="text-blue-500 cursor-pointer md:text-black hover:text-blue-500">Website: {card && card!.web!}</p>
                <p className=" md:text-black">Address: {card && card!.address.country!}, {card && card!.address.city!}, {card && card!.address.street!}, {card && card!.address.houseNumber!} </p> 
                <div className="size-[30vw]">
                    {Key && <iframe
                        className="size-full"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        loading="lazy"
                        src={`
                    https://www.google.com/maps/embed/v1/place?key=${Key}
                    &q=${card?.address.street}+${card?.address.city}+${card?.address.state}
                  `}
                    />}
                </div>
            </div>
        </div>
    )
}
export default CardDetails;

