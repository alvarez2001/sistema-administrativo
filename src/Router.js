import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Page404 from "./pages/pagesError/Page404";

class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
					<Route exact path="/" component={Login} />
					<Route component={Page404} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default Router;
