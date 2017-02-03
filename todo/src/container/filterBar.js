import {setVisibilityFilter, clearCompleted} from '../store/action/index.js';

import {connect} from 'react-redux';

import TodoFooter from '../component/footer/footer.js';


function mapStateToProps(state, ownProps) {
    return {
        todos: state.todos,
        activeFilter: state.visibilityFilter
    }
}


function mapDispatchToProps(dispatch) {
    return {
        onFilter: (filter) => {
            dispatch(setVisibilityFilter(filter))
        },
        onClear: () => {
            dispatch(clearCompleted())
        }
    }
}


const FilterBar = connect(mapStateToProps, mapDispatchToProps)(TodoFooter);


export default FilterBar;