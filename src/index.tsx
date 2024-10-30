import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkThema, lightThema } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import reset from 'styled-reset';

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body{
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  a{
    text-decoration: none;
  }
`;


root.render(
  <ThemeProvider theme={lightThema}>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <GlobalStyles/>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </ThemeProvider>

);

