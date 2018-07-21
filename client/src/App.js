import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	state = {
	  initialText: "Loading..."
	};

	componentDidMount() {
	  fetch('http://localhost:5000/api/test/get')
	    .then(response => response.json())
	    .then(jsonResponse => {
	      this.setState({
	        initialText: jsonResponse.result
	      });
	    })
	    .catch(error => {
	      this.setState({
	        initialText: "Error loading initial text from API"
	      });
	    });
	}
	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.initialText}
        </p>
      </div>
    );
  }
}

export default App;
