import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
	useEffect(() => {
		if (window.location.protocol === "http:") {
			let link = window.location.href;
			link = link.replace("http", "https");
			window.location.href = link;
		}
	});

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
