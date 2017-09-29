import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import TopBar from '../components/TopBar';

class Main extends React.Component {

  componentDidMount() {}
  componentDidUpdate() {

  }
  render() {
    return (
      <div>


        <TopBar {...this.props} />


        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Main;
