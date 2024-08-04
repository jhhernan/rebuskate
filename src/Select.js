import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import * as S from './styled';
import mail from './img/mail.png';

const Select = ({ label, values, onChange })  => {

  const [currentValue, setCurrentValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log('En el handleOpen');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (value) => {
    setCurrentValue(value);
  };
  const handleChange = (value) => {
    handleValueChange(value);
    // call method, if it exists
    if (onChange) onChange(value);
    // close, after all tasks are finished
    handleClose();
  };
  return (
    <S.SelectContainer>
      <S.SelectLabelButton onClick={handleOpen}>
        {currentValue !== "" ? currentValue : label}
      </S.SelectLabelButton>
      <S.DropdownStyle isVisible={open}>
        {values.map((value, index) => (
          <S.DropdownItem
            onClick={() => handleChange(value)}
            active={value === currentValue}
            key={index}
          >
            {value}
          </S.DropdownItem>
        ))}
      </S.DropdownStyle>
    </S.SelectContainer>
  );
}


export default Select;
