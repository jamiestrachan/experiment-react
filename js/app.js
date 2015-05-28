var Ad = React.createClass({displayName: "Ad",
  render: function() {
    return (
      React.createElement("div", {className: "ad"}, 
        "Ad"
      )
    );
  }
});

var Card = React.createClass({displayName: "Card",
  render: function() {
    return (
      React.createElement("div", {className: "card"}, 
        React.createElement("a", {href: this.props.contentItem.url}, 
          React.createElement("img", {src: this.props.contentItem.headlineimage.derivatives["16x9_620"].fileurl, width: "100%"})
        ), 
        React.createElement("a", {href: this.props.contentItem.url}, this.props.contentItem.title)
      )
    );
  }
});

var Feed = React.createClass({displayName: "Feed",
  loadContent: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({content: data.contentlist.contentitems});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {content: []};
  },
  componentDidMount: function() {
    this.loadContent();
    //setInterval(this.loadContent, this.props.pollInterval);
  },
  render: function() {
    var cards = [];
    var contentBetweenAds = 6;
    var sinceLastAd = 0;
    this.state.content.forEach(function(contentItem) {
      if (sinceLastAd >= contentBetweenAds) {
        cards.push(React.createElement(Ad, null));
        sinceLastAd = 0;
      }
      cards.push(React.createElement(Card, {contentItem: contentItem, key: contentItem.id}));
      sinceLastAd++;
    });
    return (
      React.createElement("div", {className: "feed"}, 
        cards
      )
    );
  }
});
