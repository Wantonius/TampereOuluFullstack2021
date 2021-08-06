import React from 'react';

interface Props {
	name?:string;
}

export default class HelloWorld extends React.Component<Props> {
	
	render() {
		let name:string = "World";
		if(this.props.name) {
			name = this.props.name;
		}
		return (
			<h1>Hello {name}</h1>
		)
	}
}