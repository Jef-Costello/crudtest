import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const Error = React.createClass({
  newproduct(that) {
    this.props.newProduct(
      this.props.global.token,
      that.refs.npname.value,
      that.refs.ndescription.value);
  },

  componentDidUpdate() {},
  componentDidMount() {},
  render() {
    return (
      <div>

        <div className="error">
          <CSSTransitionGroup transitionName="example" transitionAppear transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
            <figure className="errorinner ">{this.props.global.error.message}

              <br />

            </figure>
          </CSSTransitionGroup>
        </div>
      </div>
    );
  },
});

export default Error;
