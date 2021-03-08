import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CrearUsuario from "./crear-usuario/CrearUsuario";

class RouterUsuario extends Component {
	render() {
		const path = this.props.estado.match.url;
		const basename = this.props.basename;

		return (
			<Switch>
				<Route
					exact
					path={`${path}${basename}/crear`}
					component={CrearUsuario}
				/>
			</Switch>
		);
	}
}

export default RouterUsuario;
