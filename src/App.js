import React, { Component } from 'react';

import estomatos from './images/estomatos.jpg'
import './App.css';
import Pin from './Pin'

class App extends Component {

  constructor(props) {
    super(props)

    this.pin = 0
  
    this.state = {
      marcadores: [],
       counter: 0,
       containerWidth: 0,
       containerHeight: 0
    }
  }

  // componentDidMount = () => {
  //   window.addEventListener("resize", this.handlePosition)
  // }
  

  handleClickContainer = ( e ) => {
    const offW = this.pin.offsetWidth || 29
    const offY = this.pin.offsetHeight || 29

    const marcador = {
      posX: e.clientX - ( offW / 2 ),
      posY: e.clientY - ( offY / 2 ),
      counter: this.state.counter + 1,
      display: 'block',
      containerWidth: this.container.offsetWidth,
      containerHeight: this.img.offsetHeight,
    }
    
    this.setState({
      counter: this.state.counter + 1,
      marcadores: [...this.state.marcadores, marcador]
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
  
  mostrarPin = ( key_marcador ) => {
    return (
      <Pin 
        refValue={ ref => this.pin = ref } 
        counter={ this.state.marcadores[key_marcador].counter } 
        posX={`${ this.state.marcadores[key_marcador].posX }px`} 
        posY={`${ this.state.marcadores[key_marcador].posY }px`} 
        display={ this.state.marcadores[key_marcador].display } />
    )
  }
  
  render() {
    return (
      <div ref={ ref => this.container = ref } className="container" onClick={ this.handleClickContainer }>
        <img ref={ ref => this.img = ref } src={estomatos} useMap='#image-map' />
        
        {
          Object
            .keys( this.state.marcadores )
            .map( key => this.mostrarPin( key, this.state.marcadores[key] ))
        }

        {/* <Pin refValue={ ref => this.pin = ref } posX={`${ this.state.posX }px`} posY={`${ this.state.posY }px`} display={ this.state.display } /> */}
        {/* { this.state.count && <Pin refValue={ ref => this.pin = ref } counter={ this.state.counter } posX={`${ this.state.posX }px`} posY={`${ this.state.posY }px`} display={ this.state.display } /> } */}
      </div>
    );
  }
}

export default App
