import { User } from "../../types/user"
import { errorProfileImage } from "../../utils/errorVideoAndImage";

export interface AnswersItemProps{
    id:string;
    content:string;
    owner:User;
    likes:User[];
}

export default function AnswersItem({id,content,owner,likes}:AnswersItemProps){
    return (
        <article>
            <div>
                <img src={owner.profileImage} onError={errorProfileImage}/>
                <h2>{owner.username}</h2>
            </div>
            <div>
                <p>{content}</p>
            </div>
        </article>
    )
}