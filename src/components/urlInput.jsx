import React from "react";
import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const LSKEY = "FFsURLsLStoragr"; //local storage key

class UrlShortenner extends Component {
  state = {
    url: "",
    shortenedUrl: "",
    savedUrls: [] //local storage date (array of JSon {urlShortenned: "tiynUrl", url : "url"})
  };

  componentDidMount() {
    const savedValues = localStorage.getItem(LSKEY);
    if (savedValues === null) {
      console.log("componentDidMount: there are no Urls saved!");
    } else {
      console.log("componentDidMount:", JSON.stringify(savedValues));
      this.setState({ savedUrls: savedValues });
    }
  }

  handleTextChange = evt => {
    this.setState({ url: evt.target.value });
  };

  handleSubmit = () => {
    if (this.state.url !== "") {
      const newShort = this.doTheShortThing(this.state.url);
      this.setState({
        shortenedUrl: newShort,
        show: !this.state.show
      });
    } else {
      this.setState({ show: false });
    }

    this.addToLocalStorage();
  };

  addToLocalStorage() {
    //get current items
    let savedValue = localStorage.getItem(LSKEY);
    console.log("Saved value", JSON.stringify(savedValue));

    console.log("NEW short value:", this.state.shortenedUrl);
    console.log("NEW url value:", this.state.url);

    //add the new one
    const newValue = [
      { shortenedUrl: this.state.shortenedUrl, url: this.state.url }
    ];
    if (savedValue === null) {
      savedValue = newValue;
    } else {
      savedValue.concat(newValue);
    }
    this.setState({ savedUrls: savedValue });

    //save it
    localStorage.setItem(LSKEY, savedValue);
    console.log("New stored values", JSON.stringify(savedValue));
  }

  doTheShortThing(url) {
    //UrlMap.
    const urlkey = Math.random()

      .toString(36)
      .substr(2, 5);
    return urlkey;
  }

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
        {this.state.show && this.state.shortenedUrl !== "" && (
          <CardContent>
            <Typography variant="body2" component="p">
              <label>{this.state.url}</label>
              Shortened to URL:&nbsp;
              <a href={this.state.url} target="_blanc">
                {this.state.shortenedUrl}
              </a>
            </Typography>
          </CardContent>
        )}
      </Card>
    );
  }
}

export default UrlShortenner;
