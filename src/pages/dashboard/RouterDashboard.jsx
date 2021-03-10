import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CerrarSession from "./cerrar-sesion/CerrarSesion";
import RouterUsuario from "./usuario/RouterUsuario";
import HomeDashboard from "./home/HomeDashboard";
import RouterEstadoCuenta from "./estado-de-cuenta/RouterEstadoCuenta";

class RouterDashboard extends Component {
	render() {
		const path = this.props.estado.match.url;
		return (
			<React.Fragment>
				<Switch>
					<Route path={`${path}/`} exact component={HomeDashboard} />

					<Route path={`${path}/off/1`} exact component={CerrarSession} />
				</Switch>
				<RouterEstadoCuenta basename="/estado" estado={this.props.estado} />
				<RouterUsuario basename="/usuario" estado={this.props.estado} />
			</React.Fragment>
		);
	}
}

export default RouterDashboard;
