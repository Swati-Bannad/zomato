import { RES_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { useSelector } from "react-redux";
 
const Itemlist =(props) => {
    const {items} = props;
    const dispatch = useDispatch();
    const handleAddItem = (item) =>{
        dispatch(addItem(item))
    }
    const handleRemoveItem = (item) =>{
        dispatch(removeItem(item));
    }
    const cartItems = useSelector((store) =>store.cart.items);
    return (
    <div className="accordian-body">
        {items.map((item) => (
            
            <div key={item.card.info.id}>
                <div className="menu-deatil-box">
                    <h5>{item.card.info.name}</h5>
                    <p>Rs. {item.card.info.price/100 || item.card.info.defaultprice/100}</p>
                    <p>{item.card.info.description}</p>
                    
                </div>
                <div className="menu-image-box">
                    <img src={RES_URL + item.card.info.imageId} />
                    <button className="btn-add" onClick={() => handleAddItem(item)}>Add</button>
                    {/* {cartItems.length > 0 && <div className="added-item-button">
                        <button onClick={() => handleRemoveItem(item)}>-</button>
                        <button>{cartItems.length }</button>
                        <button onClick={() => handleAddItem(item)}>+</button>
                    </div>} */}
                </div>
            </div>
            
        ))}
       
    </div>
    )
}
export default Itemlist;