import React, { Component } from 'react';
import styles from '../../styles';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Checkbox from '../../elements/Checkbox';
import {withRouter} from 'react-router';
import {updateAppURL} from '../../../tools';
let socket = io.connect('http://localhost:8000');

class EditTodo extends Component {
    constructor(props) {
        super(props);
        let that = this;
        socket.on('news', function (data) {
            that.setState({description:data.text});
        });
        this.state = this.props.task || {};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState(nextProps.task);
        }
    }
    componentWillUnmount(){
        socket.removeAllListeners("news");
    }

    markDone() {
        this.setState({...this.state, completed: !this.state.completed});
    }

    editTaskName(name) {
        this.setState({...this.state, name});
    }

    editDescription(text){
        this.setState({...this.state, description:text});
        socket.emit('sentText', { text: text });
    }

    saveChanges(decision) {
        updateAppURL(this.props.router, {...this.props.params, taskId: ""});
        if (decision) {
            this.props.editTask(this.state);
        }
    }

    render() {
        return (
            <div className="col-sm-12 clearfix edit-todo">
                <div className="row" style={styles}>
                    <div className="col-sm-4 pull-right text-right">
                        <Button classNames={"btn btn-primary"}
                                handleClick={() => this.saveChanges(true)}>Сохранить</Button>
                        <Button classNames={"btn btn-primary"}
                                handleClick={() => this.saveChanges(false)}>Отменить</Button>
                    </div>
                </div>
                <div className="row task-name">
                    <div className="col-sm-4 pull-left">
                        <p>Задача:</p>
                        <Input type="text" handleChange={(e) => this.editTaskName(e.target.value)} val={this.state.name}/>
                    </div>
                </div>
                <div className="row task-mark-done">
                    <div className="col-sm-4 pull-left">
                        <Checkbox isChecked={this.state.completed} handleChange={(e) => this.markDone(e.target.value)}>Завершено</Checkbox>
                    </div>
                </div>
                <div className="row task-mark-done">
                    <div className="col-sm-12">
                        <p style={{color:"lightslategray",fontSize:"14px"}}>Описание:</p>
                        <textarea className="form-control"
                                  value={this.state.description}
                                  onChange={(e) => this.editDescription(e.target.value)}
                                  placeholder="Description"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditTodo);