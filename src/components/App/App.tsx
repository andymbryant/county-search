import React, { Component } from 'react';
import './App.css';

class App extends Component {

	state = {
		isLoading: false,
		data: null,
		levels: []
	}

	componentDidMount() {
		this.setState({
			isLoading: true
		})
		this.fetchData()
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
						isLoaded: true,
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
			topLevelData
		})
	}

	render() {
		return (
			<div className="App">
				<header>
					<h1>County Search</h1>
				</header>
			</div>
		);
	}
}

export default App;
