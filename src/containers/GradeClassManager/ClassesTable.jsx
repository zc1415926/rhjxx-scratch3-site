import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import InfoTable from '../../components/GradeClassManager/InfoTable';

class ClassesTable extends React.Component {

  render() {
    const columns = [
      { title: '班级编号', field: 'classNum' },
      { title: '班级名称', field: 'className' },
    ];

    return (
      <InfoTable title={this.props.grade + '级班级信息表'}
        columns={columns}
        data={this.props.data}
        options={{ search: false }}
        postHandler={(newData) => this.props.onPostClassInfo({...newData, 'gradeNum':this.props.grade})}
        putHandler={(newData) => this.props.onPutClassInfo(newData)}
        deleteHandler={(oldData) => this.props.onDeleteClassInfo(oldData)}
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
    onPostClassInfo: (classInfo) => dispatch(actionCreators.postClassInfo(classInfo)),
    onPutClassInfo: (classInfo) => dispatch(actionCreators.putClassInfo(classInfo)),
    onDeleteClassInfo: (classInfo) => dispatch(actionCreators.deleteClassInfo(classInfo)),
    onToggoleClassesTableEditing: (isEditing) => dispatch(actionCreators.toggoleClassesTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesTable);