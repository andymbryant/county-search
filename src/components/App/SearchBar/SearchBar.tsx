import React, { Component } from 'react';
// import { find } from 'lodash';
import './SearchBar.css';

type MyProps = {
    data: any,
    levels: String[]
}

class SearchBar extends Component<MyProps> {

    state = {
        searchFocus: false,
        query: ''
    }

    onFocus(event: any) {
        this.setState({
            searchFocus: true
        })
    }

    onBlur(event: any) {
        this.setState({
            searchFocus: false
        })

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
                <div className="search-input">
                    <input
                        type="text"
                        className="search-field"
                        onChange={(e) => this.handleChange(e)}
                        onFocus={(e) => this.onFocus(e)}
                        onBlur={(e) => this.onBlur(e)}
                    />
                    <div className="search-toggle">
                        {this.state.searchFocus ? <div className="arrow arrow-active"></div> : <div className="arrow"></div>}
                    </div>
                </div>
                {this.state.query ? <div className="cancel">X</div> : null}
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