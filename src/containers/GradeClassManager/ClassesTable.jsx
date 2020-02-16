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
        postHandler={(newData, resolve) => this.props.onPostClassInfo({...newData, 'gradeNum':this.props.grade}, resolve)}
        putHandler={(newData, resolve) => this.props.onPutClassInfo(newData, resolve)}
        deleteHandler={(oldData, resolve) => this.props.onDeleteClassInfo(oldData, resolve)}
        //toggleEditingHandler={(isEditing) => this.props.onToggoleClassesTableEditing(isEditing)}
        //isEditing={this.props.isEditing}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //isEditing: state.gcInfoReducer.isClassesTableEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostClassInfo: (classInfo, resolve) => dispatch(actionCreators.postClassInfo(classInfo, resolve)),
    onPutClassInfo: (classInfo, resolve) => dispatch(actionCreators.putClassInfo(classInfo, resolve)),
    onDeleteClassInfo: (classInfo, resolve) => dispatch(actionCreators.deleteClassInfo(classInfo, resolve)),
    //onToggoleClassesTableEditing: (isEditing) => dispatch(actionCreators.toggoleClassesTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesTable);