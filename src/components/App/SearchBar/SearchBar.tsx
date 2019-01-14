import React, { Component } from 'react';
import './SearchBar.css';
import Item from './Item/Item'

// Specify the type of incoming props
type MyProps = {
    data: any,
    levels: String[]
}

class SearchBar extends Component<MyProps> {

    state = {
        // Boolean representation of whether the user is focused on the search field or not
        searchFocus: false,
        // User search query
        query: ''
    }

    // From input field
    // When input field is focused, the state is updated
    onFocus(event: any) {
        this.setState({
            searchFocus: true
        })
    }

    // From input field
    // When input field is not focused, the state is updated
    onBlur(event: any) {
        this.setState({
            searchFocus: false
        })
    }

    // From input field
    // Captures input text from user, makes it lowercase
    handleChange(event: any) {
        this.setState({ query: event.target.value.toLowerCase() });
    }

    // From cancel button, which appears when user adds text to search field
    cancel() {
        this.setState({
            query: ''
        })
    }

    render() {
        // Destructure props and state
        let { data, levels } = this.props;
        const { query } = this.state;

        // Initialize typed variables
        let style = {} as Object;
        let levelClass: String = '';
        let filteredData: any[] = [];

        // Filter function for JSON filtering on query
        // Initialized here for proper data binding
        function filterItems(item: any) {
            // If the item is the bottom level, check if the query matches
            // one of its children
            if (!item.isBotLevel) {
                for (let d of item.children) {
                    if (d.indexOf(query) !== -1) {
                        return true
                    }
                }
            } else {
                // Otherwise, check if the name of the item matches the query
                return item.name.toLowerCase().includes(query)
            }
        }

        // If there the user makes a query, filter the items accordingly
        // If not and filteredData is empty, add data to filteredData
        if (this.state.query) {
            filteredData = data.filter(filterItems)
        } else if (filteredData.length === 0) {
            filteredData = data
        }


        // if (!filteredData) {
        //     return (
        //         <div className="search-bar">
        //             <input type="text" className="search-field" placeholder="No Results" />
        //         </div>
        //     )
        // }
        return (
            <div className="search-bar">
                <div className="search-input">
                    {/* Input field with event handlers and functions */}
                    <input
                        type="text"
                        placeholder="Please select a county"
                        value={this.state.query}
                        className="search-field"
                        onChange={(e) => this.handleChange(e)}
                        onFocus={(e) => this.onFocus(e)}
                    // onBlur={(e) => this.onBlur(e)}
                    />
                    {/* Conditionally render arrow by adding arrow-active class, based on user focus */}
                    <div className="search-toggle">
                        {this.state.searchFocus ? <div className="arrow arrow-active"></div> : <div className="arrow"></div>}
                    </div>
                </div>
                {/* Conditionally render cancel button, based on existence of user input - query */}
                {this.state.query ?
                    <div
                        className="cancel"
                        onClick={() => this.cancel()}
                    >X</div> : null}
                {/* Conditionally show search items, based on user focus */}
                {this.state.searchFocus ? <div className="search-items">
                    {/* Loop through filtered data, returning a div for reach item in list */}
                    {filteredData.map((item: any) => {
                        // Conditional indentation, based on index of item level
                        // in the hierarchy mapping "levels", using inline styling
                        style = { "paddingLeft": (levels.indexOf(item.level) + 1) * 20 + "px" }
                        // Assign classes for conditional CSS
                        if (item.isBotLevel) {
                            levelClass = 'bot-level'
                        } else {
                            levelClass = 'high-level'
                        }
                        return <Item
                            style={style}
                            name={item.name}
                            id={item.id}
                            levelClass={levelClass}
                            key={item.id}
                        />

                    })}
                </div>
                    : null}
            </div>
        )
    }
}

export default SearchBar;