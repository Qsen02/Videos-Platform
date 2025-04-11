import { useUserThemeContext } from "../../contexts/UserAndTheme";

export default function Main(props:{children:React.ReactNode}) {
    const { theme } = useUserThemeContext();
    return (
        <main
            className={
                theme == "dark" ? "darkTheme-darker" : "whiteTheme-verylight"
            }
        >
            {props.children}
        </main>
    );
}