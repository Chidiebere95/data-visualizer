import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  // this enables css class styling

  const loadTheme = () => {
    // console.log('load theme function is fired');
    const themeTemp = localStorage.getItem('theme') ?? 'light';
    localStorage.setItem('theme', themeTemp);
    setTheme(themeTemp);
    document.documentElement.setAttribute('data-theme', themeTemp);
    document.documentElement.setAttribute('class', themeTemp);
  };

  const toggleTheme = () => {
    // console.log('toggle theme function is fired');
    let updatedTheme;
    if (theme === 'light') {
      updatedTheme = 'dark';
    } else {
      updatedTheme = 'light';
    }
    localStorage.setItem('theme', updatedTheme);
    setTheme(updatedTheme);
    document.documentElement.setAttribute('data-theme', updatedTheme);
    document.documentElement.setAttribute('class', updatedTheme);
  };

  useEffect(() => {
    loadTheme();
  }, [theme]);
  return { theme: localStorage.getItem('theme') ?? 'light', toggleTheme };
};
