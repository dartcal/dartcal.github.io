import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../cssfolder/profile.css' 

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="classModal">
        <div className="classModalTitle"><br></br>ADD A CLASS</div>
          {this.props.children}
        
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