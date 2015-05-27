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
        <a href={"http://www.cbc.ca" + this.props.contentItem.url}>{this.props.contentItem.title}</a>
      </div>
    );
  }
});

var Feed = React.createClass({
  render: function() {
    var cards = [];
    var contentBetweenAds = 6;
    this.props.content.forEach(function(contentItem) {
      cards.push(<Card contentItem={contentItem} key={contentItem.id} />);
    });
    return (
      <div className="feed">
        {cards}
      </div>
    );
  }
});