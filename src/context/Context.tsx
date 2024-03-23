import { ReactNode, createContext } from 'react';
import { useTheme } from '../hooks/useTheme';

interface Props {
  children?: ReactNode;
}
export const AppContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});
export default function ContextProvider({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  return (
    <AppContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </AppContext.Provider>
  );
}
