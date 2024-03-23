import React, { useContext } from 'react';
import Router from './navigation/Router';
import { AppContext } from './context/Context';
import { lightTheme, darkTheme } from './utils/themes/themes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './utils/themes/themes';
import './App.css';
export default function App() {
  const { theme } = useContext<any>(AppContext);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}
