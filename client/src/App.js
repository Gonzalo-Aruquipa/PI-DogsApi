import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";
import { Provider } from "react-redux";
import store from "./store";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/createDog" component={CreateDog} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
