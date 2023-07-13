import close_icon from "./files/icons/close.png"
import "./notification.css"

const Notifaction = ({state, close, message}) => {
    return ( 
        <div className="notification" style={{ visibility: state ? 'visible' : 'hidden' }}>
            <div className="notification_in">
                <div className="notification_close_pane">
                    <div onClick={close}><img src={close_icon} alt="" /></div>
                </div>
                <div className="notification_message">{message}</div>
            </div>
        </div>
     );
}
 
export default Notifaction;