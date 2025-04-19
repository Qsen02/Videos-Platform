import { useNavigate } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./LogoutStyles.module.css";

export default function Logout(){
    const {theme,removeUser}=useUserThemeContext();
    const navigate=useNavigate();

    function onCancel(){
        history.back();
    }

    async function onLogout(){
        if(removeUser){
           await removeUser();
           navigate("/login");
        }
        return;
    }

    return (
        <section className={theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"} id={styles.wrapper}>
            <h2>Are you sure you want to logout?</h2>
            <div className={styles.buttons}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onLogout}>Logout</button>
            </div>
        </section>
    )
}