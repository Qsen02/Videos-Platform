import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import UserThemeContextProvider from "./contexts/UserAndTheme";
import Main from "./components/main/Main";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import NotFound from "./components/not-found/NotFound";
import Logout from "./components/logout/Logout";
import CreateVideo from "./components/create-video/CreateVideo";
import VideoDetails from "./components/video-details/VideoDetails";
import VideoDelete from "./components/video-details/video-delete/VideoDelete";
import VideoEdit from "./components/video-details/video-edit/VideoEdit";
import CommentDelete from "./components/video-details/video-comments/comments-delete/CommentsDelete";
import CommentEdit from "./components/video-details/video-comments/comments-edit/CommentsEdit";
import Profile from "./components/profile/Profile";

function App() {
	return (
		<>
			<UserThemeContextProvider>
				<Header />
				<Main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/logout" element={<Logout/>}/>
						<Route path="/create" element={<CreateVideo/>}/>
						<Route path="/videos/:videoId" element={<VideoDetails/>}>
							<Route path="delete" element={<VideoDelete/>}/>
							<Route path="edit" element={<VideoEdit/>}/>
							<Route path="comments/:commentId/delete" element={<CommentDelete/>}/>
							<Route path="comments/:commentId/edit" element={<CommentEdit/>}/>
						</Route>
						<Route path="/profile/:userId" element={<Profile/>}/>
						<Route path="*" element={<NotFound/>}/>
					</Routes>
				</Main>
			</UserThemeContextProvider>
		</>
	);
}

export default App;
