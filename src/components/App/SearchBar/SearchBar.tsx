import React, { Component } from 'react';
import './SearchBar.css';

type MyProps = {
    data: any,
    levels: String[]
}

class SearchBar extends Component<MyProps> {

    render() {
        const { data, levels } = this.props;
        let style = {} as Object;

        return (
            <div className="search-bar">
                <input type="text" className="search-field" />
                <div className="search-items">
                    {data.map((item: any) => {
                        style = { "margin-left": levels.indexOf(item.level) * 1.2 + "rem" }
                        return (
                            <div style={style} className="item" key={item.id}>{item.name}</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default SearchBar;