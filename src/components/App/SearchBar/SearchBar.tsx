import React, { Component } from 'react';
import './SearchBar.css';

type MyProps = {
    data: any
}

class SearchBar extends Component<MyProps> {
    render() {
        const { data } = this.props;
        return (
            <div className="search-bar">
                <input type="text" className="search-field" />
                <div className="search-items">
                    {data.map((item: any) => {
                        return (
                            <div className="item" key={item.id}>{item.name}</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default SearchBar;