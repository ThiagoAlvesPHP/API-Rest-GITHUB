//  LIBs
import { RiTimeLine, RiLinkM } from "react-icons/ri";
import { Link } from "react-router-dom";

// STYLE
import './style.scss';

export function Input(props) {
    return (
        <div className={`Input`}>
            <input type="search" placeholder='Search' value={props.search} onChange={(e)=>props.setSearch(e.target.value)} />
        </div>
    )
}