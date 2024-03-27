import { useDispatch, useSelector } from "react-redux";
import Itemlist from "./Itemlist";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";


const Cart = () => {
    const cartItems = useSelector((store) =>store.cart.items);
    const dispatch = useDispatch();
    const handleClearCart= () => {
        dispatch(clearCart());
    }
    const orderstatus = () =>{
        dispatch(clearCart()); 
    }
    return (
        <div className="menu-page res-fex">
            <div className="cart-container">
                <h1>Cart Items</h1>
                
                {cartItems.length == 0 && <div><p>There is nothing in your cart.Let's add some items</p><Link to="/">Home</Link></div>}
                {cartItems.length > 0 && 
                    <div>
                        <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
                        <Itemlist items={cartItems}/>
                        {/* <button className="proceedpayment">Proceed to Payment</button> */}
                    </div>
                    
                }
            </div>
            {cartItems.length > 0 && <Link to="/success"><button className="proceedpayment" onClick={orderstatus}>Proceed to Payment</button></Link>}
        </div>
    )
}

export default Cart;