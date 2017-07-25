import React from 'react';
import withRouter from 'react-router-v4-hocs/lib/withRouter';

class TopNav extends React.Component{
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.router.history.push(e.target.getAttribute('href'));
  }
  
  render() {
    return(
      <div className="top-nav">
        <a className="top-nav__link" href={this.props.href} onClick={this.handleClick}>{this.props.title}</a>
      </div>
    )
  }
}

export default withRouter(TopNav);
