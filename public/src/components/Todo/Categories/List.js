import React, { Component } from 'react';
import Category from './Category';
import ConfirmModal from '../../common/ConfirmModal';
import EditModal from '../../common/EditModal';
import styles from '../../styles';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showConfirm: false,
            showEdit: false,
            showAddCategory:false
        };
    }

    confirmDeletion(id) {
        let category = this.props.categories.find(category => category.id === id);

        this.setState({showConfirm: true, id, categoryName: category.name})
    }

    editCategoryRequest(id) {
        let category = this.props.categories.find(category => category.id === id);

        this.setState({showEdit: true, id, categoryName: category.name});
    }

    deleteCategory(id, confirmed) {
        if (confirmed) {
            this.props.handleDelete(id);
        }

        this.setState({showConfirm: false, id: ''});
    }

    editCategory(id, newName, confirmed) {
        if (confirmed && newName) {
            this.props.handleEdit(id, newName);
        }

        this.setState({showEdit: false, id: "", categoryName: newName});
    }

    addNestedCategoryRequest(id){
        this.setState({showAddCategory: true, id, categoryName: ""});
    }

    addNestedCategory(id,name,confirmed){
        if (confirmed && name) {
            this.props.addNestedCategory(id, name);
        }

        this.setState({showAddCategory: false, id: "", categoryName: name});
    }


    render() {
       let css = this.props.stylesKey ? styles[this.props.stylesKey] : styles.todoList;
       let categoriesAmount = this.props.categories.length;
       let self = this;

       let nestedListProps = {
            handleDelete: self.props.handleDelete,
            handleEdit: self.props.handleEdit,
            addNestedCategory:self.props.addNestedCategory,
            moveTaskToAnotherCategory:self.props.moveTaskToAnotherCategory,
            activeTask: !!self.props.activeTask,
           setProgressBarData:self.props.setProgressBarData

        };


        return (
            <div style={css} className="col-sm-12">
                {this.props.categories.map((category, index) =>
                    <Category deleteItem={this.confirmDeletion.bind(this)}
                              editItem={this.editCategoryRequest.bind(this)}
                              key={category.id}
                              activeTask={this.props.activeTask}
                              isSubList={this.props.isSubList}
                              nestedListProps={nestedListProps}
                              setProgressBarData={this.props.setProgressBarData}
                              addNestedCategory={this.addNestedCategoryRequest.bind(this)}
                              moveTaskToAnotherCategory={this.props.moveTaskToAnotherCategory}
                              isLastItemOfSubList={categoriesAmount === index}
                        {...category}/>)}

                <ConfirmModal isShown={this.state.showConfirm}
                              categoryName={this.state.categoryName}
                              handleAction={this.deleteCategory.bind(this, this.state.id )}/>

                <EditModal isShown={this.state.showEdit}
                           categoryName={this.state.categoryName}
                           handleAction={this.editCategory.bind(this, this.state.id )}/>

                <EditModal isShown={this.state.showAddCategory}
                           categoryName={this.state.categoryName}
                           handleAction={this.addNestedCategory.bind(this, this.state.id )}/>

            </div>
        );
    }
}

export default List;