//  LIBs
import { RiTimeLine, RiLinkM } from "react-icons/ri";
import { Link } from "react-router-dom";

// STYLE
import './style.scss';

export function List(props) {
    return (
        <div key={props.id} className={`List`}>
            <a href={props.html_url} target="_blank">
            {props.full_name}
            </a>
            <span className='language'>{props.language}</span>
            <span className='created_at'>{props.created_at}</span>
            <span className='updated_at'>{props.updated_at}</span>
        </div>
    )
}