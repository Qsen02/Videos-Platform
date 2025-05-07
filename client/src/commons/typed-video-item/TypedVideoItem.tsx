import { Link } from "react-router-dom";
import styles from "./TypedVideoItemStyles.module.css";

interface TypedVideoItemProps {
	id: string;
	title: string;
}

export default function TypedVideoItem({ id, title }: TypedVideoItemProps) {
	return (
		<Link to={`/videos/${id}`} className={styles.wrapper}>
			<article>
				<h2>{title}</h2>
			</article>
		</Link>
	);
}
