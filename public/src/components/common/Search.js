import React,{Component} from 'react';
import Input from '../elements/Input';
import Icon from '../elements/Icon';
import Button from '../elements/Button';
import styles from '../styles';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {inputValue: props.search || ""};
    }

    handleClickWrapper() {
        this.props.handleClick(this.state.inputValue);
    }

    clearSearch(val){
        this.setState({inputValue: val});
        this.props.handleClick(val);
    }

    render() {
        return (
            <div style={styles.inputHolder} className={"input-group col-sm-8"}>
                <Button handleClick={this.handleClickWrapper.bind(this)}>Искать</Button>
                <Input val={this.state.inputValue}
                       handleChange={e => this.setState({inputValue: e.target.value})}
                       placeholderText="Искать..."/>
                {this.state.inputValue ?
                    <Icon classNames="input-icon icon-remove glyphicon glyphicon-remove"
                          handleClick={() => this.clearSearch("")}/>
                    : null}
            </div>
        )
    }


}

export default Search;