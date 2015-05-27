var Ad = React.createClass({
  render: function() {
    return (
      <div className="ad">
        Ad
      </div>
    );
  }
});

var Card = React.createClass({
  render: function() {
    return (
      <div className="card">
        <a href={"http://www.cbc.ca" + this.props.contentItem.url}>
          <img src={this.props.contentItem.headlineimage.derivatives["16x9_620"].fileurl} width="100%" />
        </a>
        <a href={"http://www.cbc.ca" + this.props.contentItem.url}>{this.props.contentItem.title}</a>
      </div>
    );
  }
});

var Feed = React.createClass({
  loadContent: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
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
    setInterval(this.loadContent, this.props.pollInterval);
  },
  render: function() {
    var cards = [];
    var contentBetweenAds = 6;
    var sinceLastAd = 0;
    this.state.content.forEach(function(contentItem) {
      if (sinceLastAd >= contentBetweenAds) {
        cards.push(<Ad />);
        sinceLastAd = 0;
      }
      cards.push(<Card contentItem={contentItem} key={contentItem.id} />);
      sinceLastAd++;
    });
    return (
      <div className="feed">
        {cards}
      </div>
    );
  }
});