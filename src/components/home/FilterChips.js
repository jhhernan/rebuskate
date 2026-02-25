import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, spacing, shadows } from '../../theme';
import { transitions } from '../../utils/animations';

const FilterContainer = styled.div`
  padding: ${spacing[6]} ${spacing[4]};
  background: ${colors.background.primary};
  border-radius: 16px;
  margin-bottom: ${spacing[6]};
  box-shadow: ${shadows.sm};

  @media (min-width: 640px) {
    padding: ${spacing[6]} ${spacing[6]};
  }
`;

const FilterLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text.secondary};
  margin-bottom: ${spacing[3]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ChipRow = styled.div`
  display: flex;
  gap: ${spacing[2]};
  flex-wrap: wrap;
  margin-bottom: ${props => props.hasMargin ? spacing[4] : 0};

  @media (max-width: 640px) {
    overflow-x: auto;
    flex-wrap: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Chip = styled.button`
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: 999px;
  border: 2px solid ${props => props.active ? colors.primary.main : colors.neutral[300]};
  background: ${props => props.active ? colors.primary.main : colors.background.primary};
  color: ${props => props.active ? colors.text.inverse : colors.text.primary};
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all ${transitions.fast};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};

  &:hover {
    ${props => props.active ? `
      background: ${colors.primary.dark};
      border-color: ${colors.primary.dark};
    ` : `
      border-color: ${colors.primary.main};
      color: ${colors.primary.main};
    `}
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ChipBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.25)' : colors.neutral[200]};
  font-size: 12px;
  font-weight: 700;
`;

const DEPARTMENTS = [
  { value: 'Atlantico', label: 'Atlántico' },
  { value: 'Bolivar', label: 'Bolívar' },
  { value: 'Cordoba', label: 'Córdoba' },
  { value: 'Cesar', label: 'Cesar' },
  { value: 'Guajira', label: 'Guajira' },
  { value: 'Magdalena', label: 'Magdalena' },
  { value: 'Sucre', label: 'Sucre' },
];

const CITIES = {
  Atlantico: ['Barranquilla', 'Ponedera', 'Malambo', 'Soledad'],
  Bolivar: ['Cartagena', 'Turbaco'],
  Cordoba: ['Monteria', 'Montelibano'],
  Cesar: ['La Paz', 'Valledupar'],
  Guajira: ['Riohacha', 'Palomino'],
  Magdalena: ['Rodadero', 'Santa Marta'],
  Sucre: ['Corozal', 'Sincelejo'],
};

export const FilterChips = ({ posts = [], onFilterChange }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Count posts per department
  const getDepartmentCount = (dept) => {
    return posts.filter(post => post.department === dept).length;
  };

  // Count posts per city
  const getCityCount = (city) => {
    return posts.filter(post =>
      post.department === selectedDepartment && post.city === city
    ).length;
  };

  const handleDepartmentClick = (dept) => {
    const newDept = selectedDepartment === dept ? '' : dept;
    setSelectedDepartment(newDept);
    setSelectedCity('');
    onFilterChange(newDept, '');
  };

  const handleCityClick = (city) => {
    const newCity = selectedCity === city ? '' : city;
    setSelectedCity(newCity);
    onFilterChange(selectedDepartment, newCity);
  };

  return (
    <FilterContainer>
      <FilterLabel>Ubicación</FilterLabel>

      <ChipRow hasMargin={selectedDepartment !== ''}>
        {DEPARTMENTS.map(dept => (
          <Chip
            key={dept.value}
            active={selectedDepartment === dept.value}
            onClick={() => handleDepartmentClick(dept.value)}
          >
            {dept.label}
            <ChipBadge active={selectedDepartment === dept.value}>
              {getDepartmentCount(dept.value)}
            </ChipBadge>
          </Chip>
        ))}
      </ChipRow>

      {selectedDepartment && CITIES[selectedDepartment] && (
        <>
          <FilterLabel style={{ marginTop: spacing[4] }}>Ciudad / Municipio</FilterLabel>
          <ChipRow>
            {CITIES[selectedDepartment].map(city => (
              <Chip
                key={city}
                active={selectedCity === city}
                onClick={() => handleCityClick(city)}
              >
                {city}
                <ChipBadge active={selectedCity === city}>
                  {getCityCount(city)}
                </ChipBadge>
              </Chip>
            ))}
          </ChipRow>
        </>
      )}
    </FilterContainer>
  );
};
