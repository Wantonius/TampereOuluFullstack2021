import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

interface MatchDetails {
	id:string
}

export default class Secret extends React.Component<RouteComponentProps<MatchDetails>> {
	render() {
		return(
			<h2>Welcome to secret page {this.props.match.params.id}</h2>
		)
	}
}
