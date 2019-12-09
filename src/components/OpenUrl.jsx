import React from "react";
import NotFound404 from "./NotFound";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  withRouter
} from "react-router-dom";

import LocalDatabase from "../api/Data";

function openTheURL(url) {
  if (!(url.includes("http://") || url.includes("https://"))) {
    url = "http://".concat(url);
  }

  window.location.assign(url);
}

const OpenUrl = ({ match, location, history }) => {
  // const query = new URLSearchParams(props.location.search);
  // const name = query.get('url');
  debugger;
  const tinyUrl = match.params.shortUrl;
  //const fromUrl = history.location;

  let urlItem;
  if (tinyUrl) {
    let UrlsDB = new LocalDatabase();
    urlItem = UrlsDB.getItemFromShort(tinyUrl);

    if (urlItem) {
      openTheURL(urlItem.url);
      //history.push(urlItem.url);
    }
  }

  return urlItem ? (
    <Router>
      <div>
        <h2>« Página de redireccionamento!! »</h2>
        <h3>{urlItem ? urlItem.url : "NotFound"} </h3>
        <Route>
          <Redirect to={urlItem.url} from={location.pathname} />
        </Route>
      </div>
    </Router>
  ) : (
    <NotFound404></NotFound404>
  );
};

export default withRouter(OpenUrl);
