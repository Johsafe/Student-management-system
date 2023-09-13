import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavigationRoutes from './Utils/NavigationRoutes';
function App() {
  return (
    <div>
      <ToastContainer position="top-right" limit={1} />
      <div>
        <NavigationRoutes />
      </div>
    </div>
  );
}

export default App;
