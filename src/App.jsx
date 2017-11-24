import React, { Component } from 'react'
import './App.css'

import Modal from './components/Modal'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  toggleModal = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Click me</button>
        <Modal title="Modal title!" open={this.state.open} toggleModal={this.toggleModal}>
          Hallo ich bin ein Modal!
        </Modal>
      </div>
    )
  };
}

export default App;
