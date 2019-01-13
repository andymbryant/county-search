import React, { Component } from 'react';
// import { find } from 'lodash';
import './SearchBar.css';

type MyProps = {
    data: any,
    levels: String[]
}

class SearchBar extends Component<MyProps> {

    state = {
        query: 'f'
    }

    render() {
        let { data, levels } = this.props;
        const { query } = this.state;
        let style = {} as Object;
        let levelClass: String = '';

        if (this.state.query) {
            data = data.filter((d: any) => {
                return d.name.toLowerCase().includes(query.toLowerCase())
            })
        }

        return (
            <div className="search-bar">
                <input type="text" className="search-field" />
                <div className="search-items">
                    {data.map((item: any) => {
                        style = { "paddingLeft": (levels.indexOf(item.level) + .6) * 1.666667 + "rem" }
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