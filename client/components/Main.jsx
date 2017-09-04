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
        <div>
          <br />
          <br />
          <br />

          <div />
        </div>
        <TopBar {...this.props} />
        <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500} />

        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default Main;
