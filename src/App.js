import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Mypage from "./page/Mypage";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Mypage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
