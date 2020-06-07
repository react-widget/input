import React from "react";
import classnames from "classnames";
import omit from "lodash/omit";
import warning from "warning";
import TextArea from "./TextArea";

type LiteralUnion<T extends U, U = string> = T | (U & {});

export function fixControlledValue<T>(value: T) {
	if (typeof value === "undefined" || value === null) {
		return "";
	}
	return value;
}

function shouldAffixWrapped(props: InputProps) {
	return !!(props.prefix || props.suffix);
}

export interface InputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"size" | "prefix" | "type" | "onChange"
	> {
	prefixCls?: string;
	type?: LiteralUnion<
		| "button"
		| "checkbox"
		| "color"
		| "date"
		| "datetime-local"
		| "email"
		| "file"
		| "hidden"
		| "image"
		| "month"
		| "number"
		| "password"
		| "radio"
		| "range"
		| "reset"
		| "search"
		| "submit"
		| "tel"
		| "text"
		| "time"
		| "url"
		| "week"
	>;
	prepend?: React.ReactNode;
	prependProps?: React.HTMLAttributes<HTMLElement>;
	append?: React.ReactNode;
	appendProps?: React.HTMLAttributes<HTMLElement>;
	prefix?: React.ReactNode;
	prefixProps?: React.HTMLAttributes<HTMLElement>;
	suffix?: React.ReactNode;
	suffixProps?: React.HTMLAttributes<HTMLElement>;
	size?: "small" | "default" | "large";
	inputClassName?: string;
	inputStyle?: React.CSSProperties;
	onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onChange?: (value: string, e: React.SyntheticEvent) => void;
	renderer?: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
}

export interface InputState {
	value: InputProps["value"];
}

export default class Input extends React.Component<InputProps, InputState> {
	static defaultProps: InputProps = {
		prefixCls: "rw-input",
		type: "text",
		disabled: false,
		defaultValue: "",
	};

	static getDerivedStateFromProps(nextProps: InputProps, state: InputState) {
		return {
			value: nextProps.value === undefined ? state.value : nextProps.value,
		};
	}

	static TextArea = TextArea;

	state: Readonly<InputState> = {
		value: this.props.defaultValue,
	};

	inputRef: React.RefObject<HTMLInputElement> = React.createRef();

	getSnapshotBeforeUpdate(prevProps: InputProps) {
		if (shouldAffixWrapped(prevProps) !== shouldAffixWrapped(this.props)) {
			warning(
				this.inputRef.current !== document.activeElement,
				"Input",
				`When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change.`
			);
		}
		return null;
	}

	// Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
	// We keep an empty function here.
	componentDidUpdate() {}

	focus() {
		this.inputRef.current?.focus();
	}

	blur() {
		this.inputRef.current?.blur();
	}

	select() {
		this.inputRef.current?.select();
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { onPressEnter, onKeyDown } = this.props;
		if (e.keyCode === 13 && onPressEnter) {
			onPressEnter(e);
		}
		if (onKeyDown) {
			onKeyDown(e);
		}
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setValue(e.target.value, e);
	};

	componentDidMount() {}

	getInput() {
		return this.inputRef.current!;
	}

	renderPrepend() {
		const { prepend, prependProps, prefixCls } = this.props;

		return prepend ? (
			<div
				{...prependProps}
				className={classnames(`${prefixCls}-prepend`, prependProps?.className)}
			>
				{prepend}
			</div>
		) : null;
	}

	renderAppend() {
		const { append, appendProps, prefixCls } = this.props;

		return append ? (
			<div
				{...appendProps}
				className={classnames(`${prefixCls}-append`, appendProps?.className)}
			>
				{append}
			</div>
		) : null;
	}

	renderPrefix() {
		const { prefixCls, prefix, prefixProps } = this.props;

		return prefix ? (
			<div
				{...prefixProps}
				onMouseDown={(e) => {
					prefixProps?.onMouseDown?.(e);
					e.preventDefault();
				}}
				onMouseUp={(e) => {
					prefixProps?.onMouseDown?.(e);
					e.preventDefault();
				}}
				onClick={(e) => {
					prefixProps?.onClick?.(e);
					this.focus();
				}}
				className={classnames(`${prefixCls}-prefix`, prefixProps?.className)}
			>
				{prefix}
			</div>
		) : null;
	}

	renderSuffix() {
		const { prefixCls, suffix, suffixProps } = this.props;

		return suffix ? (
			<div
				{...suffixProps}
				onMouseDown={(e) => {
					suffixProps?.onMouseDown?.(e);
					e.preventDefault();
				}}
				onMouseUp={(e) => {
					suffixProps?.onMouseUp?.(e);
					e.preventDefault();
				}}
				onClick={(e) => {
					suffixProps?.onClick?.(e);
					this.focus();
				}}
				className={classnames(`${prefixCls}-suffix`, suffixProps?.className)}
			>
				{suffix}
			</div>
		) : null;
	}

	setValue(newValue: string, e: React.SyntheticEvent, callback?: () => void) {
		const { onChange, value } = this.props;
		if (value === undefined) {
			this.setState({ value: newValue }, callback);
		}

		if (onChange) {
			onChange(newValue, e);
		}
	}

	renderInput() {
		const props = this.props;
		const {
			prefixCls,
			type,
			size,
			disabled,
			readOnly,
			inputClassName,
			inputStyle,
			renderer,
		} = props;
		const { value } = this.state;

		const prefix = this.renderPrefix();
		const suffix = this.renderSuffix();
		const inputCls = classnames(
			prefixCls,
			{
				[`${prefixCls}-${size}`]: size !== "default",
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-readonly`]: readOnly,
			},
			inputClassName
		);

		const restProps: InputProps = omit(props, [
			"prefixCls",
			"style",
			"className",
			"prepend",
			"prependProps",
			"append",
			"appendProps",
			"defaultValue",
			"value",
			"size",
			"prefix",
			"prefixProps",
			"suffix",
			"suffixProps",
			"onPressEnter",
			"onChange",
			"inputClassName",
			"inputStyle",
			"renderer",
		]);

		const inputProps: {} = {
			...restProps,
			ref: this.inputRef,
			type,
			className: inputCls,
			style: inputStyle,
			onChange: this.handleChange,
			onKeyDown: this.handleKeyDown,
			value: fixControlledValue(value),
		};

		const Input = (
			<>
				{prefix}
				{renderer ? renderer(inputProps) : <input {...inputProps} />}
				{suffix}
			</>
		);

		if (!prefix && !suffix) {
			return Input;
		}

		const affixWrapperCls = classnames(props.className, `${prefixCls}-affix-wrapper`, {
			[`${prefixCls}-affix-wrapper-${props.size}`]: props.size,
		});

		return (
			<div className={affixWrapperCls} style={props.style}>
				{Input}
			</div>
		);
	}

	render() {
		const { prefixCls, className, size, prepend, append, style } = this.props;
		const classes = classnames({
			[className!]: className,
			[`${prefixCls}-wrapper`]: true,
			[`${prefixCls}-wrapper-${size}`]: size !== "default",
			[`${prefixCls}-with-prepend`]: prepend,
			[`${prefixCls}-with-append`]: append,
		});

		return (
			<div className={classes} style={style}>
				{this.renderPrepend()}
				{this.renderInput()}
				{this.renderAppend()}
			</div>
		);
	}
}
