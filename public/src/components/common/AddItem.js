import React,{ Component } from 'react';
import Input from '../elements/Input';
import Button from '../elements/Button';
import styles from '../styles';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
    }

    handleClickWrapper(){
        if(this.state.inputValue){
            this.props.handleClick(this.state.inputValue);
            this.setState({inputValue:''})
        }
    }

    render() {
        let {classNames,placeholderText} = this.props;

        return (
            <div style={styles.inputHolder} className={classNames}>
                <Input handleChange={e => this.setState({inputValue: e.target.value})}
                       placeholderText={placeholderText}
                       val={this.state.inputValue}/>

                <Button handleClick={this.handleClickWrapper.bind(this)}>Добавить</Button>
            </div>
        )
    }
}

export default AddItem;