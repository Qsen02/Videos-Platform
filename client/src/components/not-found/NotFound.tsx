import { Link } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./NotFoundStyles.module.css"

export default function NotFound(){
    const {theme}=useUserThemeContext();
    return (
        <div className={theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"} id={styles.wrapper}>
            <h2>404 page not found!</h2>
            <p>Please return to <Link to="/">Videos</Link> page.</p>
        </div>
    )
}