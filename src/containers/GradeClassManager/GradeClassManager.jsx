import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../store/actions/index';
import GradeClassesLists from '../../components/GradeClassManager/GradeClassesLists';

class GradeClassManager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gradeClassesInfo: []
        }
    }
    
    componentDidMount(){
        this.props.onGetGradeClassesInfo();
    }

    render(){
        return (
            <div>
                <h1>GradeClassManager</h1>
                <GradeClassesLists gradeClassesInfo={this.props.gradeClassesInfo} />
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        gradeClassesInfo: state.gradeClassesInfoReducer.gradeClassesInfo
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onGetGradeClassesInfo: ()=>dispatch(actionCreators.getGradeClassesInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeClassManager);