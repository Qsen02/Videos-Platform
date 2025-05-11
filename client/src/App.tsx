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
import ProfileEditUser from "./components/profile/profile-edit-user/ProfileEditUser";
import ProfileChangePassword from "./components/profile/profile-change-password/ProfileChangePassword";
import ProfileConfirm from "./components/profile/profile-confirm/ProfileConfirm";
import ProfileFollowers from "./components/profile/profile-followers/ProfileFollowers";
import ProfileFollowed from "./components/profile/profile-followed/ProfileFollowed";
import GuestGuard from "./commons/guest-guard/GuestGuard";
import UserGuard from "./commons/user-guard/UserGuard";
import VideoDetailsGuard from "./commons/video-details-guard/VideoDetailsGuard";
import Profiles from "./components/profile/Profiles";
import AnswersSection from "./components/video-details/answers-section/AnswersSection";
import AnswerDelete from "./components/video-details/answer-delete/AnswerDelete";
import AnswerEdit from "./components/video-details/answer-edit/AnswerEdit";

function App() {
	return (
		<>
			<UserThemeContextProvider>
				<Header />
				<Main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route element={<GuestGuard />}>
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
						</Route>
						<Route element={<UserGuard />}>
							<Route path="/logout" element={<Logout />} />
							<Route path="/create" element={<CreateVideo />} />
							<Route
								path="/profile/:userId"
								element={<Profile />}
							>
								<Route
									path="edit"
									element={<ProfileEditUser />}
								/>
								<Route
									path="change-password"
									element={<ProfileChangePassword />}
								/>
								<Route
									path="confirm"
									element={<ProfileConfirm />}
								/>
								<Route
									path="followers"
									element={<ProfileFollowers />}
								/>
								<Route
									path="followed"
									element={<ProfileFollowed />}
								/>
							</Route>
							<Route
								path="profiles/:userId"
								element={<Profiles />}
							/>
						</Route>
						<Route
							path="/videos/:videoId"
							element={<VideoDetails />}
						>
							<Route element={<VideoDetailsGuard />}>
								<Route
									path="delete"
									element={<VideoDelete />}
								/>
								<Route path="edit" element={<VideoEdit />} />
								<Route
									path="comments/:commentId/delete"
									element={<CommentDelete />}
								/>
								<Route
									path="comments/:commentId/edit"
									element={<CommentEdit />}
								/>
								<Route
									path="comments/:commentId/answers"
									element={<AnswersSection />}
								/>
								<Route
									path="comments/:commentId/answers/:answerId/delete"
									element={<AnswerDelete />}
								/>
								<Route
									path="comments/:commentId/answers/:answerId/edit"
									element={<AnswerEdit />}
								/>
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Main>
			</UserThemeContextProvider>
		</>
	);
}

export default App;
