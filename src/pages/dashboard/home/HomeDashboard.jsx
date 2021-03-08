import React from "react";

const HomeDashboard = (props) => {
	return (
		<React.Fragment>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
				<div className="flex flex-wrap justify-between content-start">
					<div className="w-5/12 my-3 bg-gradient-to-r from-green-900 to-green-600 rounded-lg border border-gray-200 py-2.5 flex flex-wrap justify-center items-center text-white shadow-lg">
						<span className="pr-2 text-2xl">
							<i className="fas fa-folder-open"></i>
						</span>
						<span className="text-md text-center leading-none font-lobster">
							<p className="text-2xl">20</p>
							<h3 className="">Proyectos</h3>
						</span>
					</div>
					<div className="w-5/12 my-3 bg-gradient-to-r from-green-900 to-green-600 rounded-lg border border-gray-200 py-2.5 flex flex-wrap justify-center items-center text-white shadow-lg">
						<span className="pr-2 text-2xl">
							<i className="fas fa-folder-open"></i>
						</span>
						<span className="text-md text-center leading-none font-lobster">
							<p className="text-2xl">20</p>
							<h3 className="">Proyectos</h3>
						</span>
					</div>
					<div className="w-full bg-gradient-to-r from-green-900 to-green-600 rounded-lg border border-gray-200 py-2.5 flex flex-wrap justify-center items-center text-white shadow-lg">
						<span className="pr-2 text-2xl">
							<i className="fas fa-folder-open"></i>
						</span>
						<span className="text-md text-center leading-none font-lobster">
							<p className="text-2xl">20</p>
							<h3 className="">Proyectos</h3>
						</span>
					</div>
				</div>
				<div></div>
			</div>
			<div className="mt-4"></div>
		</React.Fragment>
	);
};

export default HomeDashboard;
