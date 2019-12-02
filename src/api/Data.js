const LSKEY = "FFsURLsStorage"; //local storage key

class API {
  //** Returns an array of JSon objects (empty array if no data is present) */
  //** Example: [{urlShortenned: "tinyUrl", url : "url"},{urlShortenned: "anothertinyUrl", url : "anotherUrl"}]) */
  getAllUrl = () => {
    const localStorageData = localStorage.getItem(LSKEY);
    return localStorageData ? JSON.parse(localStorageData) : [];
  };

  //** Save all values at once (receives the JSon Array) */
  saveAll = fullData => {
    localStorage.setItem(LSKEY, JSON.stringify(fullData));
  };

  //** Add new item to storage */
  addUrlToStorage = (shortKey, url) => {
    //build the new item
    const newValue = [
      {
        shortUrl: shortKey,
        url: url
      }
    ];

    //get all existing items
    const savedValues = this.getAllUrl();

    //add the new value to collection
    const newValuesToStore = savedValues.concat(newValue);

    //save it in local storage...
    localStorage.setItem(LSKEY, JSON.stringify(newValuesToStore));
  };

  /** Get a new random unique key */
  getNewShortID = () => {
    let shortKey;
    do {
      shortKey = Math.random()
        .toString(36)
        .substr(2, 5);
    } while (this.alreadyExists(shortKey));
    return shortKey;
  };

  /** Check if key aready exits */
  alreadyExists = shortUrl => {
    let savedValues = this.getAllUrl();
    //console.log("map", Object.keys(savedValues));
    //console.log("array", savedValues.keys());

    for (var i = 0; i < savedValues.length; i++) {
      var item = savedValues[i];
      if (item.shortUrl === shortUrl) {
        return true;
      }
    }

    return false;
  };

  //** Remove item from storage */
  removeUrlFromStorage = shortUrl => {
    //get all existing items
    const savedValues = this.getAllUrl();

    let newValuesToStore = [];

    //remove the value from the collection
    for (var i = 0; i < savedValues.length; i++) {
      var item = savedValues[i];
      if (item.shortUrl !== shortUrl) {
        newValuesToStore = newValuesToStore.concat(item);
      }
    }

    //save it in local storage...
    localStorage.setItem(LSKEY, JSON.stringify(newValuesToStore));
  };

  //** Get item by short/key from storage if exists, otherwise empty */
  getItemFromShort = shortUrl => {
    //get all existing items
    const savedValues = this.getAllUrl();

    //get the matching item (if it exists...)
    for (var i = 0; i < savedValues.length; i++) {
      var item = savedValues[i];
      if (item.shortUrl === shortUrl) {
        return item;
      }
    }

    return {};
  };

  /** Check if url is already stored */
  existsUrl = url => {
    let savedValues = this.getAllUrl();

    for (var i = 0; i < savedValues.length; i++) {
      var item = savedValues[i];
      if (item.url === url) {
        return true;
      }
    }

    return false;
  };

  //** Get item by Url from storage if exists, otherwise empty */
  getItemFromURL = url => {
    //get all existing items
    const savedValues = this.getAllUrl();

    //get the matching item (if it exists...)
    for (var i = 0; i < savedValues.length; i++) {
      var item = savedValues[i];
      if (item.url === url) {
        return item;
      }
    }

    return {};
  };

  //** Get items by searching for a value in any field, otherwise empty */
  searchItem = searchSpec => {
    //get all existing items
    const savedValues = this.getAllUrl();

    // Match any "string" occurrence:  /^.*string.*$/
    const stringToRgex = "^.*".concat(searchSpec).concat(".*$");
    let searchSpecRegex = new RegExp(stringToRgex);

    let matchingItems = [];

    //get the matching item (if it exists...)
    for (var i = 0; i < savedValues.length; i++) {
      var item = savedValues[i];
      if (
        item.shortUrl.match(searchSpecRegex) ||
        item.url.match(searchSpecRegex)
      ) {
        matchingItems = matchingItems.concat(item);
      }
    }

    return matchingItems.length === 0 ? undefined : matchingItems;
  };
}

export default API;
