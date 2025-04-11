import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import UserThemeContextProvider from "./contexts/UserAndTheme";
import Main from "./components/main/Main";

function App() {
	return (
		<>
			<UserThemeContextProvider>
				<Header />
				<Main>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</Main>
			</UserThemeContextProvider>
		</>
	);
}

export default App;
