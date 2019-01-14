import React, { Component } from 'react';
// import { find } from 'lodash';
import './SearchBar.css';

type MyProps = {
    data: any,
    levels: String[]
}

class SearchBar extends Component<MyProps> {

    state = {
        query: ''
    }

    handleChange(event: any) {
        this.setState({ query: event.target.value.toLowerCase() });
    }

    render() {
        let { data, levels } = this.props;
        const { query } = this.state;
        let style = {} as Object;
        let levelClass: String = '';
        let filteredData: any[] = [];

        function filterItems(item: any) {
            if (!item.isBotLevel) {
                for (let d of item.children) {
                    if (d.indexOf(query) !== -1) {
                        return true
                    }
                }
            } else {
                return item.name.toLowerCase().includes(query)
            }
        }

        if (this.state.query) {
            filteredData = data.filter(filterItems)
        }
        if (filteredData.length === 0 && !this.state.query) {
            filteredData = data
        }

        if (!filteredData) {
            <div className="search-bar">
                <input type="text" className="search-field" placeholder="No Results" />
            </div>
        }
        return (
            <div className="search-bar">
                <input
                    type="text"
                    className="search-field"
                    onChange={(e) => this.handleChange(e)}
                />
                <div className="search-items">
                    {filteredData.map((item: any) => {
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