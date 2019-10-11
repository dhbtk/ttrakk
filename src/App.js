import React, { Component } from 'react';
import './App.css';
import Forms from './Forms';
import { reportToBurndown } from './api/toggl_report';
import Graph from './Graph';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphLoading: false,
      graphData: null
    };
  }

  loadGraph(data) {
    this.setState({ graphLoading: true });
    reportToBurndown(data).then(graphData => {
      console.log(graphData);
      this.setState({ graphLoading: false, graphData });
    });
  }

  render() {
    const { graphLoading, graphData } = this.state;
    return (
      <div className="App">
        <Forms onUpdate={data => this.loadGraph(data)} />
        {!graphLoading && graphData && <Graph graphData={graphData} />}
      </div>
    );
  }
}

export default App;
