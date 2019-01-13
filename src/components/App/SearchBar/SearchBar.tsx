import React, { Component } from 'react';
// import { find } from 'lodash';
import './SearchBar.css';

type MyProps = {
    data: any,
    levels: String[]
}

class SearchBar extends Component<MyProps> {

    state = {
        query: 'gb'
    }

    render() {
        let { data, levels } = this.props;
        const { query } = this.state;
        let style = {} as Object;
        let levelClass: String = '';
        let levelDifference: Number = 0;

        if (this.state.query) {
            data = data.filter((d: any, i: any) => {
                if (d.isBotLevel) {
                    return d.name.toLowerCase().includes(query.toLowerCase());
                } else {
                    return true;
                }
            })
            data = data.filter((e: any, j: any) => {
                if (e.isBotLevel) {
                    return true
                } else {
                    levelDifference = Math.abs(levels.indexOf(e.level) - (levels.length))
                    if (data[j + levelDifference].isBotLevel) {
                        return true
                    }
                }
            })
        }

        return (
            <div className="search-bar">
                <input type="text" className="search-field" />
                <div className="search-items">
                    {data.map((item: any) => {
                        style = { "paddingLeft": (levels.indexOf(item.level) + .6) * 1.666667 + "rem" }
                        if (item.isBotLevel) {
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