import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UrlShortener from "./components/UrlInput";
import NotFound404 from "./components/NotFound";
import Header from "./components/design/Header";
import SideBar from "./components/design/SideBar";
import UrlList from "./components/UrlList";
import UrlListMaterialUiTable from "./components/MaterialUiUrlList";
import About from "./components/About";
import SearchUrl from "./components/SearchUrl";
import OpenUrl from "./components/OpenUrl";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <SideBar />
        <div className={"rightContentContainer"}>
          <Switch>
            <Route path="/" exact component={UrlShortener} />
            <Route path="/SearchUrl" exact component={SearchUrl} />
            <Route path="/UrlList" exact component={UrlList} />
            <Route
              exact
              path="/MaterialUiUrlList"
              component={UrlListMaterialUiTable}
            />
            <Route path="/About" exact component={About} />
            <Route path="/:shortUrl" exact component={OpenUrl} />
            <Route component={NotFound404} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
