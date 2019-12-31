import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators  from '../../store/actions/index';

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
    mapGradesData(gradeData){
        return(
            <div key={gradeData.id}>
                <div>{gradeData.name}级<button>X</button></div>
                <div>{gradeData.classes.map((classItem)=>this.mapClassesData(classItem))}</div>
            </div>
        );
    }
    mapClassesData(classData){
        return(
            <div key={classData.id}>{classData.name}班<button>X</button></div>
        );
    }
    render(){
        return (
            <div>
                <h1>GradeClassManager</h1>
                {/* {console.log('[GradeClassManager]', this.props.gradeClassesInfo)} */}

                <div>{this.props.gradeClassesInfo.map((gradeItem)=>this.mapGradesData(gradeItem))}</div>
            
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