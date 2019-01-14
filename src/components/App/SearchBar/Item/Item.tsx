import React, { Component } from 'react';

// Specify the type of incoming props
type MyProps = {
    style: Object,
    name: String,
    id: Number,
    levelClass: String,
    changePlaceholder: Function
}

class Item extends Component<MyProps> {
    // Create refId, to be updated per instance
    private refId: React.RefObject<HTMLInputElement>;
    constructor(props: MyProps) {
        super(props)
        // Create React ref using refId
        this.refId = React.createRef()
        // Proper binding for functions with refs
        this.scrollToItem.bind(this)
    }

    // Checks if ref is instantiated and that it is a bot-level element
    // Scrolls into view
    scrollToItem = () => {
        const ref = this.refId.current
        if (ref !== null) {
            if (ref.classList.contains('bot-level')) {
                ref.scrollIntoView();
                this.props.changePlaceholder(ref.textContent)
            }
        }
    }

    render() {

        const { style, name, id, levelClass } = this.props;

        return (
            <div
                style={style}
                ref={this.refId}
                className={`item ${levelClass}`}
                onClick={() => this.scrollToItem()}
            >{name}
            </div>
        )
    }
}

export default Item;
