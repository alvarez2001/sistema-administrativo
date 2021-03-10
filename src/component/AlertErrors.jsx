import React from "react";

const AlertErrors = (props) => {
	return (
		<div className={props.styleAlert}>
			<ul className="text-xs ">
				{props.success ? (
					<li className="py-1"> {props.data} </li>
				) : (
					props.error?.map((error, index) => {
						return (
							<li className="py-1" key={index}>
								{error?.msg}
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
};

export default AlertErrors;
