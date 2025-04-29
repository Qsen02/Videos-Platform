import { Link, useOutletContext } from "react-router-dom";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./FollowerItemStyles.module.css";
import { User } from "../../types/user";
import { UserOutletContextType } from "../../types/outletContext";

interface FollowerItemProps {
	id: string;
	profileImage: string;
	username: string;
	email: string;
	followers: User[];
	password: string;
}

export default function FollowerItem({
	id,
	profileImage,
	username,
	email,
	followers,
	password,
}: FollowerItemProps) {
	const { theme, user } = useUserThemeContext();
	const { setUserState } = useOutletContext<UserOutletContextType>();

	function onChangeState() {
		setUserState({
			_id: id,
			profileImage: profileImage,
			username: username,
			email: email,
			followers: followers,
			password: password,
		});
	}

	return (
		<article
			className={`${styles.wrapper} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			} ${user?._id == id ? styles.you : ""}`}
		>
			<Link to={`/profile/${id}`} onClick={onChangeState}>
				<img src={profileImage} onError={errorProfileImage} />
			</Link>
			<p>{username}</p>
		</article>
	);
}
