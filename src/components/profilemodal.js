import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../cssfolder/profile.css' 
import exit from '../pictures/exit.png'

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
          <Button onClick={this.props.onClose} style={{'width': '34px', 'height': '34px', 'position': 'absolute', 'top': '1%', 'left': '94%'}}><img src={exit} style={{'position': 'absolute', 'left': '18%', 'top':'15%'}}></img></Button>
        
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