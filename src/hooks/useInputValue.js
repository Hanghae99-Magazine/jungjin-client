import { useState } from 'react';

export default (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChnage = (e) => {
    let targetValue = e.target.value;
    setValue(targetValue);
  };

  return { value, onChnage };
};
