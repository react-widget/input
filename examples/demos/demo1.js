import React, { Component } from "react";
import Input from "../../src/Input";

function Icon() {
	return "icon";
}

function IconInputs() {
	return (
		<div className="input-demo-wrapper">
			<Input />
			<Input prepend="http://" />
			<Input append=".com" />
			<Input prepend="http://" />
			<Input append=".com" />
			<Input
				prepend="http://"
				append=".com"
				prefix={<Icon type="ios-contact" />}
				suffix={<Icon type="ios-contact" />}
			/>
			<Input prefix={<Icon type="ios-contact" />} suffix={<Icon type="ios-contact" />} />
			<Input disabled prepend="http://" append=".com" suffix={<Icon type="ios-contact" />} />
			<Input
				size="small"
				prepend="http://"
				append=".com"
				suffix={<Icon type="ios-contact" />}
			/>
			<Input
				size="large"
				prepend="http://"
				append=".com"
				suffix={<Icon type="ios-contact" />}
			/>
			<Input
				append=".com"
				autoFocus
				onPressEnter={() => alert("enter")}
				suffix={<Icon type="ios-contact" />}
			/>
			<Input prepend="http://" suffix={<Icon type="ios-contact" />} />
			<Input readOnly size="small" placeholder="small size" />
			<Input />
			<Input size="large" />
			<Input size="large" disabled placeholder="small large" value="test..." />
			<Input
				size="small"
				placeholder="Enter name"
				style={{
					width: "auto",
				}}
			/>
			<Input
				placeholder="Enter name"
				style={{
					width: "auto",
				}}
			/>
			<Input
				size="large"
				placeholder="Enter name"
				style={{
					width: "auto",
				}}
			/>
		</div>
	);
}

function SearchInputs() {
	return (
		<div className="input-demo-wrapper">
			<Input
				search
				placeholder="Enter something..."
				style={{
					width: "auto",
				}}
			/>
			<Input
				search
				enterButton
				icon="ios-arrow-down"
				placeholder="Enter name"
				style={{
					width: "auto",
				}}
			/>
			<Input
				search
				enterButton="Search..."
				icon="ios-arrow-down"
				placeholder="Enter name"
				style={{
					width: "auto",
				}}
			/>
			<Input
				icon="ios-arrow-down"
				placeholder="Enter name"
				style={{
					width: "auto",
				}}
			/>
		</div>
	);
}

export default class DEMO extends Component {
	render() {
		return (
			<div>
				<IconInputs />
			</div>
		);
	}
}
