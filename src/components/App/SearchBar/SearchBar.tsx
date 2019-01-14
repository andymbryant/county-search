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
        // User search query
        query: '',
        searchActive: false,
        placeholder: 'Please select a county'
    }

    activateSearch() {
        this.setState({
            searchActive: true
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
            query: '',
            searchActive: false,
            placeholder: 'Please select a county'
        })
    }

    // Change placeholder
    // Use arrow function to correctly bind 'this'
    changePlaceholder = (text: String) => {
        this.setState({
            placeholder: text
        })
    }

    render() {
        // Destructure props and state
        let { data, levels } = this.props;
        const { query, searchActive } = this.state;

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

        return (
            <div className="search-bar">
                <div className="search-input">
                    {/* Input field with event handlers and functions */}
                    <input
                        type="text"
                        placeholder={this.state.placeholder}
                        value={this.state.query}
                        className="search-field"
                        onChange={(e) => this.handleChange(e)}
                        onFocus={() => this.activateSearch()}
                    />
                    {/* Conditionally render arrow by adding arrow-active class, based on user focus */}
                    <div className="search-toggle">
                        {searchActive ? <div className="arrow arrow-active"></div> : <div className="arrow"></div>}
                    </div>
                </div>
                {/* Conditionally render cancel button, based on existence of user input - query */}
                {this.state.searchActive ?
                    <div
                        className="cancel"
                        onClick={() => this.cancel()}
                    >X</div> : null}
                {/* Conditionally show search items, based on user focus */}
                {searchActive ? <div className="search-items">
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
                            changePlaceholder={this.changePlaceholder}
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