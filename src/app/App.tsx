import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./header/header";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <main className="app__content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
