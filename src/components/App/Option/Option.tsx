import React, { Component } from 'react';
import './Option.css';

type MyProps = {
    data: any,
    id: number
}

class Option extends Component<MyProps> {
    render() {
        const { data } = this.props;
        return (
            <option value="">{data.name}</option>
        )

    }

}

export default Option;