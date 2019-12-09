import React from "react";

import TableRender from "./TableRender";

import LocalDatabase from "../api/Data";

let UrlsDB = new LocalDatabase();

class UrlList extends React.Component {
  constructor(props) {
    super(props);
    const storedUrls = UrlsDB.getAllUrl();
    this.state = {
      savedUrls: storedUrls
    };
  }

  render() {
    return <TableRender data={this.state.savedUrls} />;
  }
}

export default UrlList;
