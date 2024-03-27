import { useEffect,useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API} from "../utils/constants";
import ResCategory from "./ResCategory";

const ResMenu = () => {
    const [resInfo , setResInfo] = useState(null);
    const {resId} = useParams();
    
    
    useEffect( () => {
        fetchMenu();
    } , []);

    const fetchMenu = async () => {
        const data= await fetch(MENU_API + resId);
        console.log(MENU_API + resId);
        const json =await data.json();
        setResInfo(json.data);
        console.log(json.data);
    }

    if(resInfo===null){
        return <Shimmer />;
    }

    const {name,cuisines,costForTwoMessage,avgRating,areaName}=resInfo?.cards[2]?.card?.card?.info;
    const {slaString} = resInfo?.cards[2]?.card?.card?.info?.sla;
    //const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((cardtype)=>
        cardtype?.card?.card?.["@type"] =="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    return (
        <div className="res-fex menu-page">
            <h3>{name}</h3>
            <div className="res-fex1">
                <div>
                    <p>{cuisines.join(", ")}</p>
                    <p>{costForTwoMessage}</p>
                </div> 
                <div >
                    <p>{avgRating}&#9733;</p>
                    <p>{areaName} , {slaString}</p>
                </div> 
            </div>   
            <div> 
                {categories.map((category) => (
                    <ResCategory key={category.card.card.title} data={category.card.card} />
                ))}
            </div>
        </div>
    )
}
export default ResMenu;
