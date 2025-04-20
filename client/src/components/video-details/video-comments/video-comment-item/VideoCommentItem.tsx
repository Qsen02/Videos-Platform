import { User } from "../../../../types/user";
import { errorProfileImage } from "../../../../utils/errorVideoAndImage";
import styles from "./VideoCommentItemStyles.module.css";

interface VideoCommentItemProps {
	theme: "light" | "dark" | undefined;
	owner: User;
	content: string;
}

export default function VideoCommentItem({
	theme,
	owner,
	content,
}: VideoCommentItemProps) {
	return (
		<article
			className={`${styles.wrapper} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			}`}
		>
			<div className={styles.commentBody}>
				<img src={owner.profileImage} onError={errorProfileImage} />
				<p>{owner.username}</p>
			</div>
			<p>{content}</p>
		</article>
	);
}
