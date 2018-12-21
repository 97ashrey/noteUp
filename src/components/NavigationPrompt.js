import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 *
 * @example
 * <NavigationPrompt when={this.props.isDirty}>
 *   {(isOpen, onConfirm, onCancel) => (
 *     <Modal show={isOpen}>
 *       <div>
 *         <p>Do you really want to leave?</p>
 *         <button onClick={onCancel}>Cancel</button>
 *         <button onClick={onConfirm}>Ok</button>
 *       </div>
 *     </Modal>
 *   )}
 * </NavigationPrompt>
 */
class NavigationPrompt extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {nextLocation: null, openModal: false};
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.unblock = this.props.history.block((nextLocation) => {
      if (this.props.when) {
        this.setState({
          openModal: true,
          nextLocation: nextLocation
        });
      }
      return !this.props.when;
    });
  }

  componentWillUnmount() {
    this.unblock();
  }

  onCancel() {
    this.setState({nextLocation: null, openModal: false});
  }

  onConfirm() {
    this.navigateToNextLocation();
  }

  navigateToNextLocation() {
    this.unblock();
    this.props.history.push(this.state.nextLocation.pathname);
  }

  render() {
    return (
      <div>
        {this.props.children(this.state.openModal, this.onConfirm, this.onCancel)}
      </div>
    );
  }
}

NavigationPrompt.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default withRouter(NavigationPrompt);