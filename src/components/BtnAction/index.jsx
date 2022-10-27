//  LIBs
import { Link } from "react-router-dom";

// STYLE
import './style.scss';

export function BtnAction(props) {
    return (
        <div className="btns">
            <Link className={props.class} onClick={() => props.del(props.identify)} title={props.title} to={props.link}>
                <props.icon />
            </Link>
        </div>
    )
}