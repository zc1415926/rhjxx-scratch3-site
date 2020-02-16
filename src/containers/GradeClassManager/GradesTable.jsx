import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import InfoTable from '../../components/GradeClassManager/InfoTable';

class GradeTable extends React.Component {

  render() {
    const columns = [
      { title: '年级编号', field: 'gradeNum' },
      { title: '年级名称', field: 'gradeName' }
    ];
    return (
      <InfoTable title={'年级信息表'}
                 columns={columns}
                 data={this.props.GradeData}
                 options={{search: false}}
                 postHandler={(newData, resolve) => this.props.onPostGradeInfo(newData, resolve)}
                 putHandler={(newData, resolve) => this.props.onPutGradeInfo(newData, resolve)}
                 deleteHandler={(oldData, resolve) => this.props.onDeleteGradeInfo(oldData, resolve)}
                 //toggleEditingHandler={(isEditing)=>this.props.onToggoleGradeTableEditing(isEditing)}
                 //isEditing={this.props.isEditing}
                 />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //isEditing: state.gcInfoReducer.isGradeTableEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostGradeInfo: (gradeInfo, resolve)=>dispatch(actionCreators.postGradeInfo(gradeInfo, resolve)),
    onPutGradeInfo: (gradeInfo, resolve)=>dispatch(actionCreators.putGradeInfo(gradeInfo, resolve)),
    onDeleteGradeInfo: (gradeInfo, resolve)=>dispatch(actionCreators.deleteGradeInfo(gradeInfo, resolve)),
    //onToggoleGradeTableEditing: (isEditing) => dispatch(actionCreators.toggoleGradeTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeTable);