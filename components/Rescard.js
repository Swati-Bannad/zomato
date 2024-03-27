import {RES_URL} from "../utils/constants";

//restaurant card component
const Rescard = (props) => {
    //const Rescard = ({resName,cuisins}) => {}
    const {resData} = props;
    const {cloudinaryImageId,name,cuisines,costForTwo,areaName,locality,avgRating} = resData?.info;

    return (
        <div className="res-card">
            <div className="img-wrap">
                <img src={RES_URL + cloudinaryImageId} />
            </div>
            <div className="res-info">
                <h4>{name}</h4>
                <div className="res-fex"> 
                    <p>{cuisines.join(", ")}</p>
                    <div className="res-fex1">
                        <p>{areaName + " " +locality}</p>
                        <p>{avgRating}&#9733;</p>
                    </div>
                    <div className="res-fex1">     
                        <p>{costForTwo}</p>
                        <p>{resData.info.sla.slaString}</p>
                    </div>    
                </div>
            </div>
        </div>
    )
}
export default Rescard;