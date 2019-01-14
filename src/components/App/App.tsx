import React, { Component } from 'react';

import SearchBar from './SearchBar/SearchBar'
import './App.css';

// type MyState = {
// 	data: Object[],
// 	levels: String[],
// 	isLoading: Boolean
// }

class App extends Component {

	state = {
		data: [],
		levels: [],
		isLoading: false
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		}, () => this.fetchData())

	}

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

	formatData = (data: any[]) => {
		let children: any[] = [];
		let levels: any[] = [];
		let filteredData: any[] = [];
		data.forEach((d) => {
			if (!levels.includes(d.level)) {
				levels.push(d.level)
			}
		})
		data.forEach((d, i) => {
			let childrenStrings: String[] = []
			children = data.filter((e, j) => {
				if (e.parent === d.id) {
					return d
				}
			})
			if (levels.indexOf(d.level) === levels.length - 2) {
				children.forEach((f) => {
					childrenStrings.push(f.name.toLowerCase())
				})
			}
			// console.log(children)
			if (children.length === 0) {
				d.isBotLevel = true
			} else {
				data.splice(i + 1, 0, ...children)
				d.isBotLevel = false
			}
			if (childrenStrings.length > 0) {
				data[i].children = childrenStrings
				data[i - 1].children = childrenStrings
			}
		})
		//remove duplicates
		filteredData = Array.from(new Set(data));
		this.setState({
			data: filteredData,
			levels
		}, () => this.setState({
			isLoading: false
		}))
	}

	render() {
		return (
			<div className="App">
				<header>
					<h1>County Search</h1>
				</header>
				{this.state.data.length !== 0 ? <SearchBar data={this.state.data} levels={this.state.levels} /> : null}
			</div>
		)
	}
}

export default App;
