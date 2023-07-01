import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PageAnimation from './Utils/PageAnimation';
function App() {
  return (
    <div>
      <ToastContainer position="top-right" limit={1} />
      <div>
        <PageAnimation />
      </div>
    </div>
  );
}

export default App;
