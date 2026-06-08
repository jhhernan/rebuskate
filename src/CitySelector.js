import { useState } from 'react';
import './App.css';
import * as S from './styled';
import { departments, getCitiesForDepartment } from './locations';

function CitySelector({selectCity, selectDepartment}) {

  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCity("");
    if (selectDepartment){
      selectDepartment(e.target.value);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (selectCity){
      selectCity(e.target.value);
    }
  };

  const cities = getCitiesForDepartment(department);

  return (
    <S.SelectorContainer>
      <select onChange={handleDepartmentChange} value={department}>
        <option value="">DEPARTAMENTO</option>
        {departments.map((departmentOption) => (
          <option key={departmentOption} value={departmentOption}>{departmentOption}</option>
        ))}
      </select>
      <select
        onChange={handleCityChange}
        value={city}>

        <option value="">CIUDAD/MCPIO</option>
        {cities.map((cityOption) => (
          <option key={cityOption} value={cityOption}>{cityOption}</option>
        ))}
      </select>
    </S.SelectorContainer>
  );
}

export default CitySelector;
