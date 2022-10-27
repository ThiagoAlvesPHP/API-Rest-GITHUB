//  LIBs
import { RiTimeLine, RiLinkM } from "react-icons/ri";
import { Link } from "react-router-dom";

// STYLE
import './style.scss';

export function Cards(props) {
    return (
        <div className={`card`}>
            <div className="color" style={{backgroundColor: props.color}}></div>
            <div className="container">
                <div className="time">
                    <div className="icon">
                        <props.icon />
                    </div>
                    <span className="title">{props.title}</span>
                </div>
                <p className="subtitle-a">{props.subtitle}</p>

                <div className="footer-card">
                    <p className="subtitle-b">{props.text}</p>
                    <Link to={`../${props.link}`} className="link">
                        <RiLinkM />
                    </Link>
                </div>
            </div>
        </div>
    )
}