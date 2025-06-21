import React, { useEffect, useState } from 'react';
import { type WheelOption } from './types';

interface Props {
  options: WheelOption[];
  setOptions: (opts: WheelOption[]) => void;
}

const Item: React.FC<{
  option: WheelOption;
  disabled: boolean;
  callBack: (field: keyof WheelOption, value: string | number) => void;
}> = (props) => {
  const { option, disabled, callBack } = props;

  const [opt, setOpt] = useState<WheelOption>(option);

  const handleChange = (field: keyof WheelOption, value: string | number) => {
    setOpt({ ...opt, [field]: value });
    callBack(field, value);
  };

  useEffect(() => {
    setOpt(option);
  }, [option]);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        disabled={disabled}
        placeholder="Tên"
        value={opt.name}
        style={{ padding: '10px 0' }}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        placeholder="Tỉ lệ"
        type="number"
        disabled={disabled}
        value={opt.weight}
        onChange={(e) => handleChange('weight', +e.target.value)}
        style={{ width: 40 }}
      />
      <input
        placeholder="Mô tả"
        disabled={disabled}
        value={opt.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </div>
  );
};

const OptionForm: React.FC<Props> = ({ options, setOptions }) => {
  const [newOption, setNewOption] = useState<WheelOption>({
    name: '',
    weight: 0,
    description: '',
  });

  const [disableOption, setDisableOption] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<WheelOption | null>(null);

  const handleChange = (field: keyof WheelOption, value: string | number) => {
    setNewOption({ ...newOption, [field]: value });
  };

  const handleCallBack = (field: keyof WheelOption, value: string | number) => {
    if (selectedOption) setSelectedOption({ ...selectedOption, [field]: value });
  };

  const handleAdd = () => {
    if (!newOption.name.trim()) return;

    const updated = [...options, { ...newOption, weight: Number(newOption.weight) }];
    setOptions(updated);
    localStorage.setItem('wheel_options', JSON.stringify(updated));
    setNewOption({ name: '', weight: 0, description: '' });
  };

  const handleSelectOption = (index: number, opt: WheelOption | null) => {
    setSelectedOption(opt);
    setDisableOption(index);
  };

  const handleEdit = () => {
    if (disableOption !== null && selectedOption !== null) {
      const updated = options;
      updated.splice(disableOption, 1, selectedOption);
      setOptions(updated);
      localStorage.setItem('wheel_options', JSON.stringify(updated));
      handleSelectOption(-1, null);
    }
  };

  const handleDelete = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    localStorage.setItem('wheel_options', JSON.stringify(updated));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>🎛️ Quản Lý Giải Thưởng</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input placeholder="Tên" value={newOption.name} onChange={(e) => handleChange('name', e.target.value)} />
        <input
          placeholder="Tỉ lệ"
          type="number"
          value={newOption.weight}
          onChange={(e) => handleChange('weight', +e.target.value)}
          style={{ width: 40 }}
        />
        <input
          placeholder="Mô tả"
          value={newOption.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <button onClick={handleAdd} style={{ fontSize: '20px' }}>
          +
        </button>
      </div>

      <ul style={{ paddingLeft: 0, minHeight: '100px' }}>
        {options.map((opt, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center', width: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Item option={opt} disabled={idx !== disableOption} callBack={handleCallBack} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {options.length > 1 && (
                <button
                  onClick={() => {
                    handleDelete(idx);
                  }}
                  style={{ background: 'transparent', width: '10px' }}
                >
                  ❌
                </button>
              )}
              <button
                onClick={() => {
                  if (idx !== disableOption) {
                    handleSelectOption(idx, opt);
                  } else {
                    handleEdit();
                  }
                }}
                style={{ background: 'transparent', width: '10px', fontSize: '20px', color: 'black' }}
              >
                {idx !== disableOption ? ' ✎ ' : '✅'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionForm;
