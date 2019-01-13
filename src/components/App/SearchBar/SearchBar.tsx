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
        let levelClass: String = '';

        return (
            <div className="search-bar">
                <input type="text" className="search-field" />
                <div className="search-items">
                    {data.map((item: any) => {
                        style = { "padding-left": (levels.indexOf(item.level) + .6) * 1.666667 + "rem" }
                        if (levels.indexOf(item.level) === levels.length - 1) {
                            levelClass = 'bot-level'
                        } else {
                            levelClass = 'high-level'
                        }
                        return (
                            <div
                                style={style}
                                className={`item ${levelClass}`}
                                key={item.id}>{item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default SearchBar;