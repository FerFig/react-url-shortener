import React from "react";
import { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

class UrlShortenner extends Component {
  state = {
    url: "",
    shortenedUrl: ""
  };

  handleTextChange = evt => {
    this.setState({ url: evt.target.value });
  };

  handleSubmit = () => {
    if (this.state.url !== "") {
      this.setState({
        shortenedUrl: this.doTheShortThing(this.state.url),
        show: !this.state.show
      });
    } else {
      this.setState({ show: false });
    }

    console.log(this.state.shortenedUrl);
  };

  doTheShortThing(url) {
    //UrlMap.
    let urlkey = Math.random()
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
        </CardActions>
        {this.state.show && this.state.shortenedUrl !== "" && (
          <CardContent>
            <Typography variant="body2" component="p">
              <p>
                <label>{this.state.url}</label>
              </p>
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
