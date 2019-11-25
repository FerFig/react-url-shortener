import React from "react";
import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const LSKEY = "FFsURLsStorage"; //local storage key

class UrlShortenner extends Component {
  state = {
    url: "",
    shortUrl: "",
    show: false,
    savedUrls: [] //local storage date (array of JSon {urlShortenned: "tiynUrl", url : "url"})
  };

  componentDidMount() {
    if (localStorage.getItem(LSKEY) === null) {
      console.log("componentDidMount: there are no Urls saved!");
    } else {
      let savedValues = JSON.parse(localStorage.getItem(LSKEY));
      console.log("componentDidMount:", JSON.stringify(savedValues));
      this.setState({ savedUrls: savedValues });
    }
  }

  addToLocalStorage(shortKey) {
    //get current items
    let savedValue = localStorage.getItem(LSKEY);

    //add the new one
    const newValue = [
      {
        shortUrl: shortKey,
        url: this.state.url
      }
    ];

    if (savedValue === null) {
      savedValue = newValue; //JSON object
    } else {
      let storedData = JSON.parse(savedValue);
      savedValue = storedData.concat(newValue);
    }

    //save it in local storage...
    localStorage.setItem(LSKEY, JSON.stringify(savedValue));
    //... and to current state
    this.setState({ savedUrls: savedValue });
  }

  handleTextChange = evt => {
    this.setState({ url: evt.target.value });
  };

  handleSubmit = () => {
    if (this.state.url !== "") {
      const shortKey = Math.random()
        .toString(36)
        .substr(2, 5);

      this.setState({
        shortUrl: shortKey,
        show: true
      });

      this.addToLocalStorage(shortKey);
    } else {
      this.setState({ show: false });
    }
  };

  handleReset = () => {
    this.setState({
      url: "",
      shortUrl: "",
      show: false
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
              placeholder="Input Url"
              margin="normal"
              onChange={this.handleTextChange}
              value={this.state.url}
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
            Submit
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
        {this.state.show && this.state.shortUrl !== "" && (
          <CardContent>
            <Typography variant="body2" component="p">
              <label>{this.state.url}</label>
              <br />
              Shortened to URL:&nbsp;
              <a href={this.state.url} target="_blanc">
                {this.state.shortUrl}
              </a>
            </Typography>
          </CardContent>
        )}
      </Card>
    );
  }
}

export default UrlShortenner;
