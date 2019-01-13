import React, { Component } from 'react';

import Option from './Option/Option'
import './App.css';

// type MyProps = {
// }

// type MyState = {
// 	isLoading: Boolean,
// 	data: Object[],
// 	topLevelData: Object[]
// }

class App extends Component {

	state = {
		isLoading: false,
		data: [],
		topLevelData: []
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
		data.forEach((d, i) => {
			children = data.filter((e, j) => {
				if (e.parent === d.id) {
					return data.splice(j, 1)
				}
			})
			data.splice(i + 1, 0, ...children)
		})
		this.setState({
			data,
			isLoading: false
		})
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading</div>
		} else {
			return (
				<div className="App">
					<header>
						<h1>County Search</h1>
					</header>
					<div className="search-bar">
						<select name="select" id="search-bar">
							{this.state.data.map((data: any) => {
								return (
									<Option
										data={data}
										id={data.id}
										key={data.id}
									/>)
							})
							}
						</select>
					</div>
				</div>
			);
		}
	}
}

export default App;
