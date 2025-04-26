import { useParams } from "react-router-dom";
import { useGetOneUser } from "../../hooks/useUsers";

export default function Profile() {
	const { userId } = useParams();
    const {user,loading,error}=useGetOneUser(null,userId);

	return (
		<>
			<section>

            </section>
		</>
	);
}
