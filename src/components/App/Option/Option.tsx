import React, { Component } from 'react';
import './Option.css';

type MyProps = {
    data: any,
    levels: String[],
    id: number,
    key: number
}

class Option extends Component<MyProps> {
    render() {
        const { data, levels, id } = this.props;

        const style = {
            marginLeft: '1rem'
        }
        return (
            <option style={style} value={data.name}>{data.name}</option>
        )
    }
}

export default Option;