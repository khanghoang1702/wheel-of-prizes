import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './App.css';

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
    }
  };

  const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: '1', style: { backgroundColor: 'white', textColor: 'black' } },
    { option: '2', style: { backgroundColor: 'red' } },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: '#5555' }}>
      <div>
        <img src="/logo.jpeg" alt="logo" width={100} />
      </div>
      <div>
        <Wheel
          mustStartSpinning={mustSpin}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
        />

        <button onClick={handleSpinClick}>SPIN</button>
      </div>
    </div>
  );
}

export default App;
