import React, { useState } from 'react';
import { type WheelOption } from './types';

interface Props {
  options: WheelOption[];
  setOptions: (opts: WheelOption[]) => void;
}

const OptionForm: React.FC<Props> = ({ options, setOptions }) => {
  const [newOption, setNewOption] = useState<WheelOption>({
    name: '',
    weight: 0,
    description: '',
  });

  const handleChange = (field: keyof WheelOption, value: string | number) => {
    setNewOption({ ...newOption, [field]: value });
  };

  const handleAdd = () => {
    if (!newOption.name.trim()) return;

    const updated = [...options, { ...newOption, weight: Number(newOption.weight) }];
    setOptions(updated);
    localStorage.setItem('wheel_options', JSON.stringify(updated));
    setNewOption({ name: '', weight: 0, description: '' });
  };

  const handleDelete = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    localStorage.setItem('wheel_options', JSON.stringify(updated));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>🎛️ Manage Options</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input placeholder="Name" value={newOption.name} onChange={(e) => handleChange('name', e.target.value)} />
        <input
          placeholder="Weight"
          type="number"
          value={newOption.weight}
          onChange={(e) => handleChange('weight', +e.target.value)}
          style={{ width: 70 }}
        />
        <input
          placeholder="Description"
          value={newOption.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {options.map((opt, idx) => (
          <li key={idx}>
            <b>{opt.name}</b> (weight: {opt.weight}) — {opt.description}
            <button onClick={() => handleDelete(idx)} style={{ marginLeft: 8 }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionForm;
