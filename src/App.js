import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TopMenu from './components/navbar/TopMenu';
import Converter from './components/converter/Converter'
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Settings from "./components/settings/Settings";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='App'>
                <div className='heading'>
                    <h1>Currency converter</h1>
                </div>
                <BrowserRouter>
                    <TopMenu/>
                    <Routes>
                        <Route path='/' element={<Converter/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    );
}

export default App;
