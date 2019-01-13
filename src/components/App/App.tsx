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
		//get top level
		let topLevelData = data.filter(d => d.parent === null)
		this.setState({
			data,
			topLevelData,
		}, () => (
			this.setState({
				isLoading: false
			})
		))
	}

	render() {
		if (this.state.isLoading) {
			return <div></div>
		} else {
			return (
				<div className="App">
					<header>
						<h1>County Search</h1>
					</header>
					<div className="search-bar">
						<select name="select" id="search-bar">
							{this.state.topLevelData !== null ? this.state.topLevelData.map((data: any) => {
								return (
									<Option
										allData={this.state.data}
										data={data}
										id={data.id}
										key={data.id}
									/>)
							}) : null}
						</select>
					</div>
				</div>
			);
		}
	}
}

export default App;
