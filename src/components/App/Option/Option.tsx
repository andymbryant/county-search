import React, { Component } from 'react';
import './Option.css';

type MyProps = {
    allData: any,
    data: any,
    id: number
}

class Option extends Component<MyProps> {
    render() {
        const { allData, data, id } = this.props;

        let subOptions: Array<any> = allData.filter((d: any) => d.parent === id)

        if (subOptions.length !== 0) {
            return (
                <option label={data.name}>
                    {subOptions.map((data: any) => {
                        console.log(data)
                        return (
                            <Option
                                allData={allData}
                                data={data}
                                id={data.id}
                                key={data.id}
                            />)
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