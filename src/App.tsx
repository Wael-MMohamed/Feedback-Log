import Main from './Main'
import { GlobalProvider } from './app/GlobalState'
import './App.css';

function App() {
  return (
      <GlobalProvider>
        <Main />
      </GlobalProvider>
  );
}

export default App;
