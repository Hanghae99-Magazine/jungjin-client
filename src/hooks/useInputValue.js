import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    const targetValue = e.target.value;
    setValue(targetValue);
  };

  return { value, onChange };
};
