import React, { Component } from 'react';

import estomatos from './images/estomatos.jpg'
import './App.css';
import Pin from './Pin'

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       posX: 0,
       posY: 0,
       display: 'none',
       counter: 0,
       containerWidth: 0,
       containerHeight: 0
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.handlePosition)
  }
  

  handleClickContainer = ( e ) => {
    const offW = this.pin.offsetWidth || 29
    const offY = this.pin.offsetHeight || 29
    
    this.setState({
      posX: e.clientX - ( offW / 2 ),
      posY: e.clientY - ( offY / 2 ),
      display: 'block',
      counter: this.state.counter + 1,
      containerWidth: this.container.offsetWidth,
      containerHeight: this.img.offsetHeight
    })
  }

  handlePosition = () => {
    const w = (this.img.offsetWidth - this.state.containerWidth)/3 || 0
    console.log(w)
    const h = (this.img.offsetHeight - this.state.containerHeight)/2 || 0

    console.log(this.container.offsetHeight, this.img.offsetHeight)
    this.setState({
      posX: this.state.posX + w,
      posY: this.state.posY + (h),
      containerWidth: this.img.offsetWidth,
      containerHeight: this.img.offsetHeight
    })
  }
  
  render() {
    return (
      <div ref={ ref => this.container = ref } className="container" onClick={ this.handleClickContainer }>
        <img ref={ ref => this.img = ref } src={estomatos} />
        <Pin refValue={ ref => this.pin = ref } posX={`${ this.state.posX }px`} posY={`${ this.state.posY }px`} display={ this.state.display } />
        { this.state.display !== 'none' && <Pin refValue={ ref => this.pin = ref } counter={ this.state.counter } posX={`${ this.state.posX }px`} posY={`${ this.state.posY }px`} display={ this.state.display } /> }
      </div>
    );
  }
}

export default App;
