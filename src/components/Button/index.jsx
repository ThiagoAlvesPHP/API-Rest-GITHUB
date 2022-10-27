//  LIBs
import { RiTimeLine, RiLinkM } from "react-icons/ri";
import { Link } from "react-router-dom";

// STYLE
import './style.scss';

export function Button(props) {
    return (
        <button className={`Button`} onClick={props.onOrder}>
            {props.title}
        </button>
    )
}