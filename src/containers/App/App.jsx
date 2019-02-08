import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { Creators } from '../../redux/reducers/dogs'

import logo from '../../theme/logo.svg';
import './App.css';

class App extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount(){
		this.props.dispatch(Creators.fetchRequest({}))
	}

	render() {
		return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{!!this.props.dogs.length &&
					<img src={this.props.dogs[0]}/>
				}
			</header>
			
		</div>
		);
	}
}


function mapStateToProps(state) {
    return {
        dogs: state.dogs.data
    };
}

export default connect(mapStateToProps)(App);