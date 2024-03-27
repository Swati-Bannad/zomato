import Itemlist from "./Itemlist";

const ResCategory = (props) => {
    const {data} = props;

    return (
        <div className="accordian-container" >
            <div className="accordian-head">
                <span>{data.title} ({data?.itemCards?.length})</span>
                <span>⬇</span>
            </div>
            <Itemlist  items={data?.itemCards} />
        </div>
    )
}
export default ResCategory;