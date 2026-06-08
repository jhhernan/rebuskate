export const locationsByDepartment = {
  Atlantico: [
    "Baranoa",
    "Barranquilla",
    "Campo de la Cruz",
    "Candelaria",
    "Galapa",
    "Juan de Acosta",
    "Luruaco",
    "Malambo",
    "Manati",
    "Palmar de Varela",
    "Piojo",
    "Ponedera",
    "Puerto Colombia",
    "Repelon",
    "Sabanagrande",
    "Sabanalarga",
    "Santa Lucia",
    "Santo Tomas",
    "Soledad",
    "Suan",
    "Tubara",
    "Usiacuri",
  ],
  Bolivar: ["Cartagena", "Turbaco"],
  Cordoba: ["Monteria", "Montelibano"],
  Cesar: ["La Paz", "Valledupar"],
  Guajira: ["Riohacha", "Palomino"],
  Magdalena: ["Rodadero", "Santa Marta"],
  Sucre: ["Corozal", "Sincelejo"],
};

export const departments = Object.keys(locationsByDepartment);

export const getCitiesForDepartment = (department) => {
  return locationsByDepartment[department] || [];
};
