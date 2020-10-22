import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import UploadSolutionPage from "./Pages/UploadSolutionsPage/UploadSolutionsPage";

function App() {
	useEffect(() => {
		if (process.env.NODE_ENV !== "development") {
			if (window.location.protocol === "http:") {
				let link = window.location.href;
				link = link.replace("http", "https");
				window.location.href = link;
			}
		}

		console.log(
			"@@@@@@@@@@@\t\t@     @\n@         @\t\t@    @\n@         @\t\t@   @\n@         @\t\t@  @\n@         @\t\t@ @\n@@@@@@@@@@@\t\t@ @\n@         @\t\t@  @\n@         @\t\t@   @\n@         @\t\t@    @\n@         @\t\t@     @\n@         @\t\t@      @"
		);
		console.log(
			"%cWebsite by Aditya Krishna Gupta",
			"color:cyan;font-size: medium"
		);
		console.log(
			"%cFind Me Here\n\n\nLinkedin: https://linkedin.com/in/adityakrishnagupta\n\n\nGithub: https://github.com/AdityaKG-169",
			"color:orange;font-size: x-large"
		);
	});
	return (
		<div className="app">
			<Navbar />
			<Switch>
				<Route component={HomePage} exact path="/" />
				<Route component={ProfilePage} path="/profile" />
				<Route component={UploadSolutionPage} path="/upload" />
				<Route component={PageNotFound} path="*" />
			</Switch>
		</div>
	);
}

export default App;
