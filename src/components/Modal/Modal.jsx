import React from 'react';
import './Modal.module.css'; // Import the CSS file for styles

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  handleKeyDown(e) {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }

  render() {
    const { image } = this.props;

    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
