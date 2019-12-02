import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import TableRender from "./TableRender";

import LocalDatabase from "../api/Data";

let UrlsDB = new LocalDatabase();

class SearchUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl: "",
      show: false,
      urlItems: [],
      noMatchfound: false
    };
  }

  handleSubmit = () => {
    if (this.state.inputUrl !== "") {
      const matchedItemsFound = UrlsDB.searchItem(this.state.inputUrl);
      if (matchedItemsFound) {
        this.setState({
          urlItems: matchedItemsFound,
          show: true,
          noMatchfound: false
        });
      } else {
        this.setState({ show: false, noMatchfound: true });
      }
    } else {
      this.setState({ show: false, noMatchfound: false });
    }
  };

  handleTextChange = evt => {
    this.setState({ inputUrl: evt.target.value });
  };

  handleReset = () => {
    this.setState({
      inputUrl: "",
      show: false,
      urlItems: [],
      noMatchfound: false
    });
  };

  render() {
    return (
      <Card>
        <CardContent>
          {/* <Typography color="textSecondary" gutterBottom>
              URL Shortener By FF @ 2019
            </Typography> */}

          <Typography variant="h5" component="h2">
            <TextField
              required
              name="url"
              label="Url:"
              placeholder="Search Url"
              margin="normal"
              onChange={this.handleTextChange}
              value={this.state.inputUrl}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleSubmit}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.handleReset}
          >
            Reset
          </Button>
        </CardActions>
        {this.state.show &&
          this.state.inputUrl !== "" &&
          this.state.urlItems.length > 0 && (
            <CardContent>
              <Typography variant="body2" component="p">
                <TableRender
                  title="Matched URLs for: "
                  data={this.state.urlItems}
                  filter={this.state.inputUrl}
                />
              </Typography>
            </CardContent>
          )}
        {this.state.noMatchfound && (
          <CardContent>
            <Typography variant="body2" component="p">
              No matching was found for the given value!
            </Typography>
          </CardContent>
        )}
      </Card>
    );
  }
}

export default SearchUrl;
