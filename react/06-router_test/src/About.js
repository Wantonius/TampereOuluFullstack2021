import React from 'react';

export default class About extends React.Component {

	render() {
		return(
			<div>
				<h1>This is a router test application</h1>
				<button onClick=
				{() => this.props.history.push("/secret")}
				>Go to secret page</button>
			</div>
		)
	}
}