import React from "react";
import { Switch, Route } from "react-router-dom";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
	return (
		<div className="app">
			<Navbar />
			<Switch>
				<Route component={HomePage} exact path="/" />
				<Route component={ProfilePage} path="/profile" />
				<Route component={PageNotFound} path="*" />
			</Switch>
		</div>
	);
}

export default App;
