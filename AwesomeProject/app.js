import React from "react-native";

let { View, Text, StyleSheet, Image } = React;

let getImage = require('./getImage');
let auth = require('./auth.json');


let App = React.createClass({
	getInitialState: function() {
		return {
			summary: '',
			temp: '',
			humidity: '',
			wind: '',
			icon: '',
			loading: true,
		}
	},

	componentWillMount: function() {
		fetch('https://api.forecast.io/forecast/' + auth.apiKey + '/45.8267,-122.423')
			.then(res => res.json())
			.then(data => {
				this.setState({
					summary: data.currently.summary,
					temp: data.currently.temperature,
					humidity: data.currently.humidity,
					wind: data.currently.windSpeed,
					icon: data.currently.icon,
					loading: false,
				})
			})
	},

	render: function () {
		if (this.state.loading) {
			return (
				<View style={[styles.container, styles.half, styles.center, styles.vertical]}> 
					<Text style={styles.text}>Loading...</Text>
				</View>
			);
		}
		else {
			return (
				<View style={styles.container}>
					<View style={[styles.half, styles.center, styles.vertical]}>
						<Image source={getImage(this.state.icon)} style={styles.image} />
						<Text style={styles.text}>{this.state.summary}</Text>
					</View>
					<View style={[styles.half, styles.center]}>
						<Text style={styles.text}>Temperature: {this.state.temp}°</Text>
						<Text style={styles.text}>Humidity: {this.state.humidity}</Text>
						<Text style={styles.text}>Wind Speed: {this.state.wind}mph</Text>
					</View>
				</View>
			);
		}
	}
})

let styles = StyleSheet.create({
	container: {
		backgroundColor: 'pink',
		flex: 1
	},
	half: {
		flex: 1
	},
	text: {
		fontSize: 22,
		fontWeight: '100',
		marginVertical: 10,
	},
	center: {
		alignItems: 'center',
	},
	vertical: {
		justifyContent: 'center',
	}
})

export default App;