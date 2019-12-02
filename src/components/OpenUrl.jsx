import React from "react";
import NotFound404 from "./NotFound";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  withRouter
} from "react-router-dom";

import LocalDatabase from "../api/Data";

function openInNewTab(url) {
  debugger;

  const win = window.open(url, "_blank");
  //const win = (window.location.href = url);
  if (win != null) {
    win.focus();
  }
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
      //openInNewTab(urlItem.url);
      //history.push(urlItem.url);
    }
  }

  return (
    <Router>
      <div>
        <h2>« Página de redireccionamento!! »</h2>
        <h3>{urlItem ? urlItem.url : "NotFound"} </h3>
        <Route>
          {urlItem ? (
            <Redirect to={urlItem.url} from={location.pathname} />
          ) : (
            <Route component={NotFound404} />
          )}
        </Route>
      </div>
    </Router>
  );
};

export default withRouter(OpenUrl);
