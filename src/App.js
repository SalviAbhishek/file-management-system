import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container">
      <ToastContainer />
      <Router>
        <Routes>
          {routes?.map((route, index) => (
            <Route key={index} path={route?.path} element={route?.component} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
