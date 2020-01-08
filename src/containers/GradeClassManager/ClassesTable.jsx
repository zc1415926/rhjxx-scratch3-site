import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import InfoTable from '../../components/GradeClassManager/InfoTable';

class ClassesTable extends React.Component {

  render() {
    const columns = [
      { title: 'classNum', field: 'classNum' },
      { title: 'className', field: 'className' },
    ];

    return (
      <InfoTable title={this.props.grade + '级班级信息表'}
        columns={columns}
        data={this.props.data}
        options={{ search: false }}
        postHandler={(newData) => this.props.onPostClassInfo({...newData, 'gradeNum':this.props.grade})}
        putHandler={(newData) => this.props.onPutClassInfo({...newData, 'gradeNum':this.props.grade})}
        deleteHandler={(id) => this.props.onDeleteClassInfo(id, this.props.grade)}
        toggleEditingHandler={(isEditing) => this.props.onToggoleClassesTableEditing(isEditing)}
        isEditing={this.props.isEditing}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isEditing: state.gcInfoReducer.isClassesTableEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostClassInfo: (gradeInfo, gradeNum) => dispatch(actionCreators.postClassInfo(gradeInfo, gradeNum)),
    onPutClassInfo: (gradeInfo) => dispatch(actionCreators.putClassInfo(gradeInfo)),
    onDeleteClassInfo: (classNumToDel, gradeNum) => dispatch(actionCreators.deleteClassInfo(classNumToDel, gradeNum)),
    onToggoleClassesTableEditing: (isEditing) => dispatch(actionCreators.toggoleClassesTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesTable);