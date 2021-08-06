import React from 'react';
import {withRouter,RouteComponentProps} from 'react-router-dom'

interface Props {
	name?:string
}

type PropsWithRouter = Props & RouteComponentProps;

class About extends React.Component<PropsWithRouter> {
	render() {
		let name:string = "World";
		if(this.props.name) {
			name=this.props.name;
		}
		let url = "/secret/"+name;
		return(
			<div>
				<h2>Hello {name}. This is an example of React Routing in typescript</h2>
				<button onClick={() => this.props.history.push(url)}>Go to secret page</button>
			</div>
		)
	}
}

export default withRouter(About);