import React from "react";
import classnames from "classnames";
import { fixControlledValue } from "./Input";

export interface TextAreaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
	prefixCls?: string;
	onChange?: (value: string, e: React.SyntheticEvent) => void;
	onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface TextAreaState {
	value: TextAreaProps["value"];
}

export default class TextArea extends React.Component<TextAreaProps> {
	static defaultProps: TextAreaProps = {
		prefixCls: "rw-input",
		defaultValue: "",
	};

	static getDerivedStateFromProps(nextProps: TextAreaProps, state: TextAreaState) {
		return {
			value: nextProps.value === undefined ? state.value : nextProps.value,
		};
	}

	state: Readonly<TextAreaState> = {
		value: this.props.defaultValue,
	};

	inputRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

	focus() {
		this.inputRef.current?.focus();
	}

	blur() {
		this.inputRef.current?.blur();
	}

	select() {
		this.inputRef.current?.select();
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const { onPressEnter, onKeyDown } = this.props;
		if (e.keyCode === 13 && onPressEnter) {
			onPressEnter(e);
		}
		if (onKeyDown) {
			onKeyDown(e);
		}
	};

	handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.setValue(e.target.value, e);
	};

	setValue(newValue: string, e: React.SyntheticEvent, callback?: () => void) {
		const { onChange, value } = this.props;
		if (value === undefined) {
			this.setState({ value: newValue }, callback);
		}

		if (onChange) {
			onChange(newValue, e);
		}
	}

	getInput() {
		return this.inputRef.current!;
	}

	render() {
		const { prefixCls, className, disabled, readOnly, onChange, ...restProps } = this.props;

		return (
			<textarea
				{...restProps}
				ref={this.inputRef}
				disabled={disabled}
				readOnly={readOnly}
				onChange={this.handleChange}
				onKeyDown={this.handleKeyDown}
				value={fixControlledValue(this.state.value)}
				className={classnames(prefixCls, {
					[className!]: className,
					[`${prefixCls}-disabled`]: !!disabled,
					[`${prefixCls}-readonly`]: !!readOnly,
				})}
			/>
		);
	}
}
