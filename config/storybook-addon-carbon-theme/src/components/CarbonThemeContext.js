import React from 'react';
import { createContext, useContext, useState } from 'react';
import { CARBON_THEME_DEFAULT } from '../shared';

const CarbonThemeContext = createContext(undefined);

// eslint-disable-next-line react/prop-types
export function CarbonThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(CARBON_THEME_DEFAULT);

  return (
    <CarbonThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </CarbonThemeContext.Provider>
  );
}

export function useCarbonThemeContext() {
  const context = useContext(CarbonThemeContext);

  if (!context) {
    throw new Error('useApp must be used inside a `AppProvider`');
  }

  return context;
}
