import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Converter from './components/converter/Converter';
import Currencies from './components/table/Currencies';
import Login from './components/login/Login';
import Settings from './components/settings/Settings';
import Signup from './components/signup/SignUp';
import TopMenu from './components/navbar/TopMenu';
import {QueryClient, QueryClientProvider} from 'react-query';
import AuthService from "./services/AuthService";
import {ReactQueryDevtools} from 'react-query/devtools'
import NotFound from "./components/navbar/NotFound";

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
                        <Route path='/currencies' element={<Currencies/>}/>
                        {AuthService.getCurrentUser() && <Route path='/settings' element={<Settings/>}/>}
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='*' element={<NotFound />}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}

export default App;