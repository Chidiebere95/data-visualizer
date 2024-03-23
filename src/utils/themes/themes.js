import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
.card-body{
   color: ${({ theme }) => theme.card_body_color} !important;
   background-color: ${({ theme }) => theme.card_body_bg_color} !important;
}
.text-color{
   color: ${({ theme }) => theme.card_body_color} !important;
}
`;
export const lightTheme = {
  card_body_color: '#1C2127',
  card_body_bg_color: '#ffffff',
};
export const darkTheme = {
  card_body_color: '#ffffff',
  card_body_bg_color: '#2b3452',
};
