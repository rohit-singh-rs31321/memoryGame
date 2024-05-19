import React, { useState, useEffect } from 'react';
import './App.css';
import CardInstruction from './components/CardInstruction';
import backButton from './assets/images/backButton.png';
import nextButton from './assets/images/next.png';
import playButton from './assets/images/play.png';
import startButton from './assets/images/start.png';
import yesButton from './assets/images/yes.png';
import Character from './assets/images/monkey.png';
import DialogBox from './assets/images/dialogBox.png';
import pinkCardImage from './assets/images/pinkCard.png';
import blueCardImage from './assets/images/blueCard.png';

import appleImage from './assets/fruit-images/apple.png';
import bananaImage from './assets/fruit-images/banana.png';
import strawberryImage from './assets/fruit-images/strawberry.png';
import grapeImage from './assets/fruit-images/grape.png';
import watermelonImage from './assets/fruit-images/watermelon.png';
import pineappleImage from './assets/fruit-images/pineapple.png';
import appleText from './assets/fruit-images/2.png';
import bananaText from './assets/fruit-images/5.png';
import strawberryText from './assets/fruit-images/3.png';
import grapeText from './assets/fruit-images/4.png';
import watermelonText from './assets/fruit-images/6.png';
import pineappleText from './assets/fruit-images/1.png';

import InstructionImage1 from './assets/images/ic1.png';
import InstructionImage2 from './assets/images/ic2.png';
import InstructionImage3 from './assets/images/ic3.png';
import EarnBanner from './assets/images/earnBanner.png';



interface Card {
  id: number;
  type: string;
  content: string;
  matched: boolean;
  imagePath?: string;
}

const initialCards: Card[] = [
  { id: 1, type: 'image', content: '🍎', matched: false, imagePath: appleImage },
  { id: 2, type: 'image', content: '🍌', matched: false, imagePath: bananaImage },
  { id: 3, type: 'image', content: '🍓', matched: false, imagePath: strawberryImage },
  { id: 4, type: 'image', content: '🍇', matched: false, imagePath: grapeImage },
  { id: 5, type: 'image', content: '🍉', matched: false, imagePath: watermelonImage },
  { id: 6, type: 'image', content: '🍍', matched: false, imagePath: pineappleImage },
  { id: 7, type: 'text', content: 'A', matched: false ,imagePath: appleText},
  { id: 8, type: 'text', content: 'B', matched: false ,imagePath: bananaText},
  { id: 9, type: 'text', content: 'S', matched: false ,imagePath: strawberryText},
  { id: 10, type: 'text', content: 'G', matched: false ,imagePath: grapeText},
  { id: 11, type: 'text', content: 'W', matched: false ,imagePath: watermelonText},
  { id: 12, type: 'text', content: 'P', matched: false ,imagePath: pineappleText},
];


const shuffleCards = (cards: Card[]) => {
  return cards.sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>(shuffleCards([...initialCards]));
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [tries, setTries] = useState<number>(0);

  const handleCardClick = (card: Card) => {
    if (selectedCards.length < 2 && !selectedCards.includes(card) && !card.matched) {
      setSelectedCards([...selectedCards, card]);
    }
  };
  console.log(cards);
  

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (
        first.type !== second.type &&
        ((first.type === 'image' && second.content === fruitNames[first.content]) ||
          (second.type === 'image' && first.content === fruitNames[second.content]))
      ) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === first.id || card.id === second.id ? { ...card, matched: true } : card
          )
        );
        setMatches(matches + 1);
        setTries(prevTries => prevTries + 1);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setSelectedCards([]);
        }, 2000);
      } else {
        setTries(prevTries => prevTries + 1);
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  }, [selectedCards]);

  const fruitNames: { [key: string]: string } = {
    '🍎': 'A',
    '🍌': 'B',
    '🍓': 'S',
    '🍇': 'G',
    '🍉': 'W',
    '🍍': 'P',
  };

  const startNewGame = () => {
    setCards(shuffleCards([...initialCards]));
    setSelectedCards([]);
    setMatches(0);
    setStep(0);
    setTries(0);
  };

  const imageCards = cards.filter(card => card.type === 'image');
  const textCards = cards.filter(card => card.type === 'text');

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const Popup = ({ firstCard, secondCard }: { firstCard: Card; secondCard: Card }) => (
    <div className="popup">
      <p>It's a match!</p>
      <div className="popup-cards">
        <div className="popup-card"><img src={firstCard.imagePath} alt={firstCard.content} /></div>
        <div className="popup-card"><img src={secondCard.imagePath} alt={secondCard.content} /></div>
      </div>
    </div>
  );

  useEffect(() => {
    if (tries >= 10 || matches === 6) {
      nextStep();
    }
  }, [tries, matches]);

  const earnedBananas = Math.min(matches, 6);

  if (step < 4) {
    return (
      <div className="App intro">
        {step === 0 && (
          <div>
            <p className='dialog'>Welcome Kidos</p>
            <img src={DialogBox} alt="Dialog Box" className="dialogBox"/>
            <img
              src={startButton}
              alt="Start Button"
              className="start-button"
              onClick={nextStep}
            />
            <img src={Character} alt="Monkey" className='characterImage'/>
          </div>
        )}
        {step === 1 && (
          <div>
            <img src={backButton} alt="Back Button" className="back-button" onClick={prevStep}/>
            <p className='dialog dialog1'>Hi, I am Mizo!<br/>and I love bananas🍌</p>
            <img src={DialogBox} alt="Dialog Box" className="dialogBox"/>
            <img
              src={nextButton}
              alt="Next Button"
              className="next-button"
              onClick={nextStep}
            />
            <img src={Character} alt="Monkey" className='characterImage'/>
          </div>
        )}
        {step === 2 && (
          <div>
            <img src={backButton} alt="Back Button" className="back-button" onClick={prevStep}/>
            <img src={DialogBox} alt="Dialog Box" className="dialogBox"/>
            <p className='dialog dialog1'>Can you help me get some? 🤔</p>
            <img
              src={yesButton}
              alt="Yes Button"
              className="yes-button"
              onClick={nextStep}
            />
            <img src={Character} alt="Monkey" className='characterImage'/>
          </div>
        )}
        {step === 3 && (
          <div>
            <img src={backButton} alt="Back Button" className="back-button" onClick={prevStep}/>
            <div className="instructionsCard">
              <CardInstruction
                image={InstructionImage1}
                heading="Select a pink card."
                subHeading="It has images."
                tagNumber="01"
              />
              <CardInstruction
                image={InstructionImage2}
                heading="Select a blue card."
                subHeading="It has alphabets."
                tagNumber="02"
              />
              <CardInstruction
                image={InstructionImage3}
                subHeading1="If they’re same"
                heading="Its a match !"
                subHeading="otherwise retry :("
                tagNumber="03"
              />
            </div>
            <img
              src={playButton}
              alt="Play Button"
              className="play-button"
              onClick={nextStep}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="progress-bar">
        <div style={{ width: `${(matches / 6) * 100}%` }} />
      </div>
      <div className="grids-container">
        <div className="cards-grid">
          {imageCards.map(card => (
            <div
              key={card.id}
              className={`card ${selectedCards.includes(card) ? 'flipped' : ''} ${
                card.matched ? 'matched' : ''
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-inner">
                <div className="card-front" style={{ backgroundImage: `url(${pinkCardImage})` }}>
                  <img src={card.imagePath} alt={card.content} />
                </div>
                <div className="card-back" style={{ backgroundImage: `url(${pinkCardImage})` }}/>
              </div>
            </div>
          ))}
        </div>
        <div className="cards-grid">
          {textCards.map(card => (
            <div
              key={card.id}
              className={`card ${selectedCards.includes(card) ? 'flipped' : ''} ${
                card.matched ? 'matched' : ''
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-inner">
                <div className="card-front" style={{ backgroundImage: `url(${blueCardImage})` }}>
                <img src={card.imagePath} alt={card.content} />
                </div>
                <div className="card-back" style={{ backgroundImage: `url(${blueCardImage})` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && selectedCards.length === 2 && (
        <Popup firstCard={selectedCards[0]} secondCard={selectedCards[1]} />
      )}
      {tries >= 10 && (
        <div className="result">
          
        <div>
        <div className="progress-bar">
        <div style={{ width: `${(matches / 6) * 100}%` }} />
      </div>
            <img src={backButton} alt="Back Button" className="back-button" onClick={startNewGame}/>
            <img src={EarnBanner} className='earnBanner' alt="banner"/>
            <div className='banner'><p>Earned</p>
              <p>{earnedBananas} Banana’s</p></div>
              <button className="newGame" onClick={startNewGame}>New Game</button>
              <p className='footer'>You've exhausted your tries!</p>
              </div>
          </div>
        
      )}
      {matches === 6 && (
        <div className="result">
          
        <div>
        <div className="progress-bar">
        <div style={{ width: `${(matches / 6) * 100}%` }} />
      </div>
            <img src={backButton} alt="Back Button" className="back-button" onClick={startNewGame}/>
            <img src={EarnBanner} className='earnBanner' alt="banner"/>
            <div className='banner'><p>Earned</p>
              <p>{earnedBananas} Banana’s</p></div>
              <button className="newGame" onClick={startNewGame}>New Game</button>
              <p className='footer'>You've matched all the cards!</p>
              </div>
          </div>
        
      )}
    </div>
  );
};

export default App;
