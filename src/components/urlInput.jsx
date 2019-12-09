import React from "react";
import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import LocalDatabase from "../api/Data";
import { ValidURL } from "../api/Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let UrlsDB = new LocalDatabase();

class UrlShortenner extends Component {
  state = {
    url: "",
    shortUrl: "",
    show: false,
    savedUrls: [] //local storage date (array of JSon {urlShortenned: "tiynUrl", url : "url"})
  };

  componentDidMount() {
    let savedValues = UrlsDB.getAllUrl();

    if (savedValues) {
      console.log("componentDidMount:", JSON.stringify(savedValues));

      this.setState({ savedUrls: savedValues });
    } else {
      console.log("componentDidMount: there are no Urls saved!");
    }
  }

  addToLocalStorage(shortKey, url) {
    UrlsDB.addUrlToStorage(shortKey, url);
    let savedValues = UrlsDB.getAllUrl();
    //... and to current state
    this.setState({ savedUrls: savedValues });
  }

  handleTextChange = evt => {
    this.setState({ url: evt.target.value });
  };

  handleSubmit = () => {
    if (this.state.url !== "") {
      let validURL = this.state.url;
      if (!ValidURL(validURL)) {
        //alert("Not a valid URL!");
        toast("Not a valid URL!");

        return;
      }

      if (UrlsDB.existsUrl(this.state.url)) {
        toast("This URL is already stored!");
        return;
      }

      const shortKey = UrlsDB.getNewShortID();

      this.setState({
        shortUrl: shortKey,
        show: true
      });

      this.addToLocalStorage(shortKey, validURL);

      //this.handleReset();
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
        <CardContent>
          <Typography>
            <ToastContainer />
          </Typography>
        </CardContent>
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
