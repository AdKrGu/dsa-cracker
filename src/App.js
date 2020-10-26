import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./app.css";
import Announcement from "./Components/Announcement/Announcement";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import UploadSolutionPage from "./Pages/UploadSolutionsPage/UploadSolutionsPage";
import Unsubscribe from "./Pages/Unsubscribe/Unsubscribe";

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
			"%cFind Me At\n\n\nLinkedin: https://linkedin.com/in/adityakrishnagupta\n\n\nGithub: https://github.com/AdityaKG-169",
			"color:orange;font-size: large"
		);
	});

	const [width, setWidth] = useState(0);

	const openSidebar = () => {
		if (width === 0) setWidth(250);
		else setWidth(0);
	};

	return (
		<div className="app">
			<Announcement />
			<Navbar openSidebar={() => openSidebar()} />
			<Switch>
				<Route component={HomePage} exact path="/" />
				<Route
					path="/profile"
					render={(props) => <ProfilePage {...props} width={width} />}
				/>
				<Route component={UploadSolutionPage} path="/upload" />
				<Route component={Unsubscribe} path="/unsubscribe/:id" />
				<Route component={PageNotFound} path="*" />
			</Switch>
		</div>
	);
}

export default App;
