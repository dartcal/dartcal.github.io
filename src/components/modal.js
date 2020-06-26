import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../cssfolder/calendar.css' 

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modalTitle">Add New Event</div>
          {this.props.children}
          <div className="enterorcancelbuttons" id="longButtons">
            <Button onClick={this.props.save}> Save </Button> &nbsp;
            <Button onClick={this.props.onClose}>Close</Button>
          </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;