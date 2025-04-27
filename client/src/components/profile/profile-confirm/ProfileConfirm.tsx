import { useNavigate, useParams } from "react-router-dom"
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import styles from "./ProfileConfirmStyles.module.css"

export default function ProfileConfirm(){
    const {theme}=useUserThemeContext();
    const {userId}=useParams();
    const navigate=useNavigate();

function onConfirm(){
    try{
        navigate(`/profile/${userId}`);
    }catch(err){
        navigate("404")
    }
}

    return (
        <div className="modal">
            <section className={`${styles.wrapper} ${
							theme == "dark"
								? "darkTheme-dark"
								: "whiteTheme-light"
						}`}>
                <h2>Password was changed successfully!</h2>
                <button onClick={onConfirm}>Ok</button>
            </section>
        </div>
    )
}