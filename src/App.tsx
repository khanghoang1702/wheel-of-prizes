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
  const [result, setResult] = useState<WheelOption | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = getWeightedIndex(options);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    setResult(options[prizeNumber]);
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
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '50px' }}>
          <img src="/logo.jpeg" alt="logo" width={150} />
        </div>
        <div>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            textColors={['#fff']}
            fontSize={22}
            backgroundColors={[
              '#0277bd',
              '#df3428',
              '#e7ad21',
              '#00ac4d',
              '#3e50b3',
              '#bdc7d6',
              '#666056',
              '#fbf1d4',
              '#ff8db5',
              '#d6d3c7',
            ]}
            onStopSpinning={handleSpinEnd}
          />
          <button
            style={{ marginTop: '50px', width: '180px', height: '85px', fontSize: '20px' }}
            disabled={mustSpin}
            onClick={handleSpinClick}
          >
            {mustSpin ? 'Đang quay...' : 'Quay'}
          </button>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <OptionForm options={options} setOptions={setOptions} />
      </Modal>
      <Modal isOpen={!!result} onClose={() => setResult(null)}>
        <div style={{ height: '300px' }}>
          {result && (
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <h2>🎉 Xe Điện Phi Khánh 🎉</h2>
              <h2>🎉 xin chúc mừng bạn đã quay trúng 🎉</h2>
              <h3 style={{ color: '#0277bd', fontSize: '30px' }}>{result.name}</h3>
              <p>{result.description}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default App;
