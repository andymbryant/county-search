import React, { Component } from 'react';
import './Option.css';

type MyProps = {
    data: any,
    id: number,
    key: number
}

class Option extends Component<MyProps> {
    render() {
        const { data, id } = this.props;

        if (data.children !== 0) {
            return (
                <option label={data.name}>
                    {data.children.map((data: any) => {
                        console.log(data)
                        // return (
                        //     <Option
                        //         data={data}
                        //         id={data.id}
                        //         key={data.id}
                        //     />)
                    })}
                </option>
            )
        }
        return (
            <option value={data.name}>{data.name}</option>
        )

    }

}

export default Option;