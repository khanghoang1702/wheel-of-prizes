import { useEffect, useMemo, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './App.css';
import Modal from './Modal';
import OptionForm from './OptionForm';
import type { WheelOption } from './types';

const defaultData = [
  { name: 'Giải Nhất', weight: 5, description: '' },
  { name: 'Giải Nhì', weight: 14, description: '' },
  { name: 'Giải Ba', weight: 80, description: '' },
  { name: 'Giải Đặc Biệt', weight: 1, description: '' },
];

const getWeightedIndex = (items: WheelOption[]) => {
  const totalWeight = items.reduce((sum, opt) => sum + opt.weight, 0);
  const rnd = Math.random() * totalWeight;
  let cumulative = 0;

  for (let i = 0; i < items.length; i++) {
    cumulative += items[i].weight;
    if (rnd < cumulative) return i;
  }
  return 0;
};

function App() {
  const [options, setOptions] = useState<WheelOption[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = getWeightedIndex(options);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
  };

  const wheelData = useMemo(() => {
    if (options.length) {
      return options.map((opt) => ({ option: opt.name }));
    }
    return defaultData.map((opt) => ({ option: opt.name }));
  }, [options]);

  useEffect(() => {
    const saved = localStorage.getItem('wheel_options');
    if (saved && JSON.parse(saved).length) {
      setOptions(JSON.parse(saved));
    } else {
      setOptions(defaultData);
      localStorage.setItem('wheel_options', JSON.stringify(defaultData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem('wheel_options')]);

  return (
    <>
      <div style={{ position: 'absolute', right: '0', top: '0' }}>
        <button
          style={{ width: '20px', height: '20px', textAlign: 'center', background: 'transparent' }}
          onClick={() => setShowModal(true)}
        >
          ⚙️
        </button>
      </div>
      <div className="main">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '120px',
            padding: '20px 0',
          }}
        >
          <img src="/1.svg" alt="logo" width={100} style={{ scale: 3 }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '120px',
            padding: '20px 0',
          }}
        >
          <img src="/5.svg" alt="logo" className="logo-2" />
        </div>
        <div
          className="outer-wheel"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '50px',
          }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            textColors={['#292828']}
            fontSize={22}
            outerBorderWidth={7}
            outerBorderColor="#43e8dc"
            innerBorderWidth={10}
            innerBorderColor="#008377"
            pointerProps={{
              style: {
                transform: 'rotate(25deg)',
                width: '20%',
                right: '25px',
                top: '25px',
              },
              src: './pointer.png',
            }}
            perpendicularText={true}
            backgroundColors={['#43e8dc', '#008377', '#e7e7e2']}
            onStopSpinning={handleSpinEnd}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'left', marginTop: '50px' }}>
          <button className="btn" disabled={mustSpin} onClick={handleSpinClick}>
            <img
              src="/3.svg"
              alt="logo"
              style={{ width: 450, height: 100, paddingRight: 70, paddingBottom: 10, scale: 5 }}
            />
          </button>
        </div>
        <div className="cat-section">
          <img src="/6.svg" alt="logo" />
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <OptionForm options={options} setOptions={setOptions} />
      </Modal>
    </>
  );
}

export default App;
