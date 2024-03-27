import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

//Header component
const HeaderComponent = () => {
    const [btnName,setBtnName] = useState("Login");
    const onlineStatus=useOnlineStatus();
    const cartItems = useSelector((store) => store.cart.items);
    return (
        <div className="header">
            <div className="container head-wrap">
            <div className="logo">
                <Link to="/"><img  src={LOGO_URL} alt="Food Logo" /></Link>
            </div>
            <ul className="nav-item">
                <li>OnlineStatus : {onlineStatus===true ? "🟢":"🔴"}</li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
                <li><Link to="/grocery">Grocery Store</Link></li>
                <li><button className="btn-login" onClick={() => {
                    btnName==="Login" ? setBtnName("Logout"):setBtnName("Login");
                }}>{btnName}</button></li>
            </ul>
            </div>
        </div>
    )
}
export default HeaderComponent;