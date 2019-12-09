import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import LocalDatabase from "../api/Data";

let UrlsDB = new LocalDatabase();

const headerStyle = {
  background: "lightgrey"
};

const titleStyle = {
  background: "darkgrey",
  color: "white"
};

class TableRender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.filter ? props.title.concat(props.filter) : props.title,
      data: props.data,
      filter: props.filter
    };
  }

  handleDeleteClick(e, item) {
    UrlsDB.removeUrlFromStorage(item.shortUrl);

    let dataToDisplay;
    if (this.state.filter) {
      dataToDisplay = UrlsDB.searchItem(this.state.filter);
    } else {
      dataToDisplay = UrlsDB.getAllUrl();
    }

    this.setState({
      data: dataToDisplay
    });
  }

  render() {
    const tableRows = this.state.data.map(item => {
      return (
        <TableRow>
          <TableCell>
            <a href={item.shortUrl}>{item.shortUrl}</a>
          </TableCell>
          <TableCell>
            {/* <NavLink to={item.shortUrl}>{item.url}</NavLink> <hr /> */}
            <a href={item.url} target="_blanc">
              {item.url}
            </a>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={e => this.handleDeleteClick(e, item)}
            >
              Remove
            </Button>
          </TableCell>
        </TableRow>
      );
    });

    return (
      <div className="root">
        <Paper
          className="paper tableTitlePadding tableTitleBGColor"
          style={titleStyle}
        >
          <Typography component="h2" variant="h5">
            {this.state.title}
          </Typography>
        </Paper>

        <Paper className="paper">
          <Table className="table" size="small" aria-label={this.state.title}>
            <TableHead>
              <TableRow style={headerStyle}>
                <TableCell>Key</TableCell>
                <TableCell>Url</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.length > 0 ? (
                tableRows
              ) : (
                <TableRow>
                  <TableCell colSpan="2" align="center">
                    No records to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

TableRender.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  filter: PropTypes.string
};

TableRender.defaultProps = {
  title: "List of stored URL's",
  data: []
};

export default TableRender;
