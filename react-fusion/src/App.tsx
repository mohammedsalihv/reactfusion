import { BrowserRouter ,  Routes , Route ,  } from 'react-router-dom';
import Counter from './Components/Counter/Counter'
import UserForm from './Components/UserForm/UserForm'
import RichTextEditor from './Components/RichText/RichTextEditor';
import Login from './Components/Login/Login';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/counter' element={<Counter/>} />
      <Route path='/userform' element={<UserForm/>}/>
      <Route path='texteditor' element={<RichTextEditor/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
