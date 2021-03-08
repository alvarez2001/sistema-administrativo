import React, { Component } from "react";
import { Redirect } from "react-router";

class CerrarSession extends Component {
	render() {
		sessionStorage.removeItem("usuario");
		sessionStorage.removeItem("user-token");

		return <Redirect to="/" />;
	}
}

export default CerrarSession;
