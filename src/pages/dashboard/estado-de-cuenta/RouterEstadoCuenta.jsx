import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CrearEstadoCuenta from "./crear-estado-cuenta/CrearEstadoCuenta";

class RouterEstadoCuenta extends Component {
	render() {
		const path = this.props.estado.match.url;
		const basename = this.props.basename;

		return (
			<Switch>
				<Route
					path={`${path}${basename}/crear`}
					exact
					component={CrearEstadoCuenta}
				/>
			</Switch>
		);
	}
}

export default RouterEstadoCuenta;
