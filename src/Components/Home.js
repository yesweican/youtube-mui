import logo from '../logo.svg';
import '../App.css';
export default function Home() {
    return (
      <div>
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h2>Welcome to My 2nd MUI App</h2>
        <p>This is the main content that will appear next to the sidebar.</p>
      </div>
    );
  }