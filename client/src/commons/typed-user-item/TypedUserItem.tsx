import { Link } from "react-router-dom";
import styles from "../typed-video-item/TypedVideoItemStyles.module.css";

interface TypedUserItemProps {
	id: string;
	username: string;
}

export default function TypedUserItem({ id, username }: TypedUserItemProps) {
	return (
		<Link to={`/profiles/${id}`} className={styles.wrapper}>
			<article>
				<h2>{username}</h2>
			</article>
		</Link>
	);
}
