import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from './components/ui/Router';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column">
        <Header />
        <RouterComponent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;