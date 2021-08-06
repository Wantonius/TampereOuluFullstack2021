import React from 'react';

interface Props {
	name?:string
}

interface State {
	seconds:number;
	timer:ReturnType<typeof setInterval> | null;
}

export default class StatefulComponent extends React.Component<Props,State> {
	
	state:State = {
		seconds:0,
		timer:null
	}
	
	componentDidMount() {
		let tempId = setInterval(this.startTimer,1000);
		this.setState({
			timer:tempId
		})
	}
	
	componentWillUnmount() {
		if(this.state.timer) {
			clearInterval(this.state.timer);
		}
	}
	
	
	startTimer = () => {
		this.setState((state) => {
			return {
				seconds:state.seconds+1
			}
		})
	}
	
	render() {
		let name = "World";
		if(this.props.name) {
			name = this.props.name;
		}
		return (
			<h2>Hello {name}. You have been on this page for {this.state.seconds} seconds</h2>
		)
	}
}