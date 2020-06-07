import React, { Component } from "react";
import Input from "../../src/index";

function SearchInputs() {
	return (
		<div className="input-demo-wrapper">
			<Input.TextArea />
			<Input.TextArea disabled />
			<Input.TextArea readOnly />
			<Input.TextArea placeholder="input..." />
		</div>
	);
}

export default class DEMO extends Component {
	render() {
		return (
			<div>
				<SearchInputs />
			</div>
		);
	}
}
