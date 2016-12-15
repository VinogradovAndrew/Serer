import React, {Component} from 'react';
import {Modal,Button}  from 'react-bootstrap';

class Confirmation extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.isShown} onHide={()=>this.props.handleAction(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm deleting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete <b>{this.props.categoryName}</b> category?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>this.props.handleAction(false)}>No</Button>
                        <Button onClick={()=>this.props.handleAction(true)}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Confirmation;
