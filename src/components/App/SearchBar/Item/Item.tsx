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
    private refId: React.RefObject<HTMLInputElement>;
    constructor(props: MyProps) {
        super(props)
        this.refId = React.createRef()
        this.scrollToItem.bind(this)
    }

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
