import React, { Component } from 'react';
import SimpleCarousel from './components/carousel/SimpleCarousel';
import './App.css';
import arbitre from './assets/arbitre.jpg';
import benevole from './assets/benevole.jpg';
import card from './assets/card.jpg';
import jeu from './assets/jeu.jpg';
import entraineur from './assets/entraineur.jpg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCarousel: false,
    };
  }

  handleToggleModal = () => {
    this.setState((prevState) => ({ 
      showCarousel: !prevState.showCarousel 
    }));
  }

  render() {
    const { showCarousel } = this.state;
    const data = [
      arbitre,
      jeu,
      entraineur,
      card,
      benevole
    ];
    
    return (
      <div className="App">
        <div>
        <button
          type="button"
          className='modalButton'
          onClick={this.handleToggleModal}
        >
          Open Modal
        </button>

        {showCarousel &&
          <SimpleCarousel 
            onCloseRequest={this.handleToggleModal} 
            data={data}
          />}
        </div>
      </div>
    );
  }
}

export default App;
