import React, { Component } from 'react';
import './SearchBar.css';

type MyProps = {
    data: any
}

class SearchBar extends Component<MyProps> {
    render() {
        const { data } = this.props;
        console.log(data)

        const style = {
            marginLeft: '1rem'
        }
        return (
            <div className="search-bar">
                {data.map((item: any) => {
                    <div style={style}>{item.name}</div>
                })}
            </div>
        )
    }
}

export default SearchBar;