
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ResizeObserver from 'react-widget-resize-observer';
import calculateNodeHeight from './calculateNodeHeight';
import Input from './Input';

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    }
    else {
        window.clearTimeout(nextFrameId);
    }
}
class ResizeTextArea extends React.Component {
    state = {
        textareaStyles: {},
    }

    get value() {

    }

    set value(value) {

    }

    resizeOnNextFrame = () => {
        if (this.nextFrameActionId) {
            clearNextFrameAction(this.nextFrameActionId);
        }
        this.nextFrameActionId = onNextFrame(this.resizeTextarea);
    }

    resizeTextarea = () => {
        const { autosize } = this.props;
        if (!autosize || !this.textAreaRef) {
            return;
        }
        const { minRows, maxRows } = autosize;
        const textareaStyles = calculateNodeHeight(this.textAreaRef, false, minRows, maxRows);
        this.setState({ textareaStyles });
    }

    saveTextAreaRef = (textArea) => {
        this.textAreaRef = textArea;
    }

    componentDidMount() {
        this.resizeTextarea();
    }

    componentDidUpdate(prevProps) {
        // Re-render with the new content then recalculate the height as required.
        if (prevProps.value !== this.props.value) {
            this.resizeOnNextFrame();
        }
    }
    focus() {
        this.textAreaRef.focus();
    }
    blur() {
        this.textAreaRef.blur();
    }
    select() {
        this.textAreaRef.select();
    }
    render() {
        const { autosize, ...otherProps } = this.props;

        const style = {
            ...this.props.style,
            ...this.state.textareaStyles,
        };

        return (
            <ResizeObserver
                onResize={this.resizeOnNextFrame}
                disabled={!autosize}
            >
                <textarea
                    {...otherProps}
                    style={style}
                    ref={this.saveTextAreaRef}
                />
            </ResizeObserver>
        );
    }
}

export default class TextArea extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        autosize: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                minRows: PropTypes.number,
                maxRows: PropTypes.number
            }),
        ]),
    }

    static defaultProps = {
        prefixCls: 'rw-input',
        autosize: false,
    }

    render() {
        const props = this.props;

        return (
            <Input
                {...props}
                className={classnames(props.className, `${props.prefixCls}-textarea-wrapper`)}
                inputComponent={ResizeTextArea}
            />
        );
    }
}
