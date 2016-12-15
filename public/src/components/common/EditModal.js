import React, {Component} from 'react';
import {Modal,Button}  from 'react-bootstrap';
import Input from '../elements/Input';

class Confirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {categoryName: props.categoryName};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({categoryName: nextProps.categoryName})
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isShown} onHide={()=>this.props.handleAction(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Write new name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input handleChange={(e)=> this.setState({categoryName:e.target.value})}
                               val={this.state.categoryName}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>this.props.handleAction(false)}>Cancel</Button>
                        <Button onClick={()=>this.props.handleAction(this.state.categoryName,true)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Confirmation;
