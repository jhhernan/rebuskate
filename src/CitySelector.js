import { useState } from 'react';
import './App.css';
import * as S from './styled';

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

  return (
    <S.SelectorContainer>
      <select style={{ "background-color": "black", "color": "white", "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none", "flex": "1", "text-align": "center", "margin": "3px" }}
        onChange={handleDepartmentChange} value={department}>
        <option value="">DEPARTAMENTO</option>
        <option value="Atlantico">Atlantico</option>
        <option value="Bolivar">Bolivar</option>
        <option value="Cordoba">Cordoba</option>
        <option value="Cesar">Cesar</option>
        <option value="Guajira">Guajira</option>
        <option value="Magdalena">Magdalena</option>
        <option value="Sucre">Sucre</option>
      </select>
      <select
        onChange={handleCityChange}
        value={city}
        // disabled={department === ""}
        style={{ "background-color": "black", "color": "white", "padding": "10px 10px 10px 10px", "border-radius": "0", "-webkit-appearance": "none", "flex": "1", "text-align": "center", "margin": "3px" }} >

        <option value="">CIUDAD/MCPIO</option>
        {department === "Atlantico" && (
          <><option key="Barranquilla">Barranquilla</option><option key="Ponedera">Ponedera</option><option key="Malambo">Malambo</option><option key="Soledad">Soledad</option></>
        )}
        {department === "Bolivar" && (
          <><option key="Cartagena">Cartagena</option><option key="Turbaco">Turbaco</option></>
        )}
        {department === "Cordoba" && (
          <><option key="Monteria">Monteria</option><option key="Montelibano">Montelibano</option></>
        )}
        {department === "Cesar" && (
          <><option key="La Paz">La Paz</option><option key="Valledupar">Valledupar</option></>
        )}
        {department === "Guajira" && (
          <><option key="Riohacha">Riohacha</option><option key="Palomino">Palomino</option></>
        )}
        {department === "Magdalena" && (
          <><option key="Rodadero">Rodadero</option><option key="Santa Marta">Santa Marta</option></>
        )}
        {department === "Sucre" && (
          <><option key="Corozal">Corozal</option><option key="Sincelejo">Sincelejo</option></>
        )}
      </select>
    </S.SelectorContainer>
  );
}

export default CitySelector;
