import React, { Component } from 'react';

import SearchBar from './SearchBar/SearchBar'

class App extends Component {

	state = {
		// Formatted data from API
		data: [],
		// Hierarchy mapping to interpret the data
		levels: [],
		// Application state
		isLoading: false
	}

	// When component mounts, load application and fetch data
	componentDidMount() {
		this.setState({
			isLoading: true
		}, () => this.fetchData())
	}

	// Fetch data from API endpoint, convert it to JSON
	// Format it and throw an error if necessary
	fetchData = () => {
		fetch("https://api.myjson.com/bins/dbg52")
			.then(res => res.json())
			.then(
				(data) => {
					this.formatData(data)
				},
				(error) => {
					this.setState({
						isLoading: true,
						error
					});
				}
			)
	}

	// Pass incoming JSON data

	formatData = (data: any[]) => {

		// Initialize typed variables
		let children: any[] = [];
		let levels: any[] = [];
		let filteredData: any[] = [];

		// Loop through data and build hierarchy mapping
		data.forEach((d) => {
			if (!levels.includes(d.level)) {
				levels.push(d.level)
			}
		})

		data.forEach((d, i) => {
			// Initialize typed variable
			let childrenStrings: String[] = [];

			// If the parent value of items match the ID of another item,
			// group those items together in an array
			children = data.filter((e, j) => {
				if (e.parent === d.id) {
					return d
				}
			})
			// If the level of an item is on step above the bottom in the hierarchy,
			// Add names of all its immediate children to childrenStrings
			if (levels.indexOf(d.level) === levels.length - 2) {
				children.forEach((f) => {
					childrenStrings.push(f.name.toLowerCase())
				})
			}
			// Add isBotLevel key to each item
			// If item is in the bottom of the hierarchy, make isBotLevel true, otherwise false
			if (children.length === 0) {
				d.isBotLevel = true
			} else {
				// If item is not botLevel, add children to the index 
				// of the data array directly proceeding it
				data.splice(i + 1, 0, ...children)
				d.isBotLevel = false
			}
			// If there are children strings, create a field and add them to the item
			// This enables search on items higher in the higherarchy
			if (childrenStrings.length > 0) {
				data[i].children = childrenStrings
				data[i - 1].children = childrenStrings
			}
		})

		// Removes duplicates from the data
		filteredData = Array.from(new Set(data));

		// Set State with filtered data and levels hierarchy
		// When this completes, update isLoading
		this.setState({
			data: filteredData,
			levels
		}, () => this.setState({
			isLoading: false
		}))
	}

	render() {
		return (
			<div className="app">
				<SearchBar data={this.state.data} levels={this.state.levels} />
			</div>
		)
	}
}

export default App;
