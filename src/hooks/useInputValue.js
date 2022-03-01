import { useState } from 'react';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    const targetValue = e.target.value;
    setValue(targetValue);
  };

  return { value, onChange };
};

export default useInputValue;
