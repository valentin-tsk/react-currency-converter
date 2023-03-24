import './App.css';
import Converter from './components/Converter'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <div className="heading">
                <h1>Currency converter</h1>
            </div>
            <Converter></Converter>
        </div>
    );
}
export default App;
