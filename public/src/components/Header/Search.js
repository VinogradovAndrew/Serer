import React,{Component} from 'react';
import Checkbox from '../elements/Checkbox';
import SearchElement from '../common/Search';
import {withRouter} from 'react-router';
import {updateAppURL} from '../../tools';

class Search extends Component {

    changeFilter(showActive){
        let filter = showActive ? 'active' : '';

        if(this.props.params.filter !== filter){
            updateAppURL(this.props.router, {...this.props.params, filter});
        }
    }

    changeSearch(search){
        if(!search || this.props.params.search !== search){
            updateAppURL(this.props.router, {...this.props.params, search});
        }
    }

    render() {
        let {filter, search} = this.props.params;
        let showActive = filter === "active";

        return (
            <div className="col-sm-5 pull-right search">
                <Checkbox handleChange={() => this.changeFilter(!showActive, search)}
                isChecked={showActive}>Показать сделанные</Checkbox>
                <SearchElement search={search}
                               handleClick={this.changeSearch.bind(this)}/>
            </div>
        )
    }
}

export default withRouter(Search);