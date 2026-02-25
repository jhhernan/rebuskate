// Responsive breakpoints
export const breakpoints = {
  mobile: '640px',
  tablet: '1024px',
  desktop: '1280px',
};

// Media query helpers
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet})`,
  minTablet: `@media (min-width: ${breakpoints.mobile})`,
  minDesktop: `@media (min-width: ${breakpoints.tablet})`,
};
