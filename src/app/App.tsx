import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./header/header";
import { ScrollTop } from "./scroll-top/scroll-top";

function App() {
  return (
    <div className="app">
      <ScrollTop />

      <div className="app__header">
        <Header />
      </div>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
