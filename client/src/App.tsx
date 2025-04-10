import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";

function App() {
	return (
		<>
         <Header />
			<main>
				<Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
			</main>
		</>
	);
}

export default App;
