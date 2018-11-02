import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';

class SimpleCarousel extends Component {

  constructor() {
    super();
    this.state = {
      index: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }
  
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp = e => {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
      37: () => {
        e.preventDefault();
        this._handleClickLeft();
      },
      39: () => {
        e.preventDefault();
        this._handleClickRight();
      }
    };

    if (keys[e.keyCode]) { 
      keys[e.keyCode](); 
    }
  }

  handleOutsideClick = e => {
    const { onCloseRequest } = this.props;
  
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }

  _renderChildrens = () => {
    const { data } = this.props;
    const { index } = this.state;
    return (
      <div>
        <img src={data[index]} alt={'coucou'}/>
      </div>
    )
  }

  _handleClickRight = () => {
    const { data } = this.props
    const { index } = this.state;
    
    if (data.length - 1 <= index) {
      this.setState({
        index: 0,
      });
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }
  }

  _handleClickLeft = () => {
    const { data } = this.props
    const { index } = this.state;

    if (index <= 0) {
      this.setState({
        index: data.length - 1,
      });
    } else {
      this.setState((prevState) => ({
        index: prevState.index - 1,
      }));
    }
  }

  render() {
    const {
      onCloseRequest,
    } = this.props;
    return (
      <div className='modalOverlay'
        ref={node => (this.modal = node)}
      >
        <div className='modal' >
          <div className='leftButtonContainer'>
            <button
              type='button'
              className='leftButton'
              onClick={this._handleClickLeft}
            >
              Left
            </button>
          </div>
          <div className='modalContent'>
            {this._renderChildrens()}
          </div>
          <div className='rightButtonContainer'>
            <button
              type='button'
              className='rightButton'
              onClick={this._handleClickRight}
            >
              Right
            </button>
          </div>
        </div>

        <button
          type="button"
          className='closeButton'
          onClick={onCloseRequest}
        >
        Close
        </button>
      </div>
    )
  }
}

export default SimpleCarousel;