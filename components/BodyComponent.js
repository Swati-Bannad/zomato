import Rescard from "./Rescard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom"
import useOnlineStatus from "../utils/useOnlineStatus";

//Body Component
const BodyComponent= () =>{
    const [listofRestaurants,setlistofRestaurants]=useState([]);
    const [filteredlistofRestaurants,setfilteredlistofRestaurants]=useState([]);
    const [searchText, setSearchText] = useState("");
    // console.log(listofRestaurants)
    useEffect( () => {
        fetchData();
    },[]);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.974938146071992&lng=77.52763834497807&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        //const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.974938146071992&lng=77.52763834497807&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        //console.log(json.data);
       // console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
        setlistofRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredlistofRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
     
    const onlineStatus= useOnlineStatus();
    if(onlineStatus==false) return (<h1>Please check internet connection</h1>)

    return listofRestaurants.length ===0 ? (<Shimmer />) : (
        <div>
            <div className="filter">
                <div className="Searchbar">
                    <input type="text"  className="search-box" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                    <button onClick={() => {
                        const matchedres=listofRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        // if (matchedres.length===0){
                        //     setfilteredlistofRestaurants([]);
                        //     return(<h1>No Results Found</h1>)
                        // }
                        setfilteredlistofRestaurants(matchedres);
                    }}>Search</button>
                </div>
                <button className="btn-filter" onClick={() => {
                    const filteredres=listofRestaurants.filter((res) => res.info.avgRating>4.3);
                    setfilteredlistofRestaurants(filteredres);
                }}>Filter Top Rated Restaurants </button>
            </div>
            <div className="res-wrap">
                <div className="res-container">
                    {
                        filteredlistofRestaurants.map( (restaurant)  =>  (
                            <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
                                {restaurant.info.isOpen===true && <label className="promotion-lablel">Open</label> }
                                <Rescard  resData={restaurant} />
                            </Link> // returning JSX inside map by looping over restraunts
                        ) )
                    }
                </div>
            </div>
        </div>
        
    )
}
export default BodyComponent;