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
                 postHandler={(newData) => this.props.onPostGradeInfo(newData)}
                 putHandler={(newData) => this.props.onPutGradeInfo(newData)}
                 deleteHandler={(oldData) => this.props.onDeleteGradeInfo(oldData)}
                 toggleEditingHandler={(isEditing)=>this.props.onToggoleGradeTableEditing(isEditing)}
                 isEditing={this.props.isEditing}
                 />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isEditing: state.gcInfoReducer.isGradeTableEditing,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostGradeInfo: (gradeInfo)=>dispatch(actionCreators.postGradeInfo(gradeInfo)),
    onPutGradeInfo: (gradeInfo)=>dispatch(actionCreators.putGradeInfo(gradeInfo)),
    onDeleteGradeInfo: (gradeInfo)=>dispatch(actionCreators.deleteGradeInfo(gradeInfo)),
    onToggoleGradeTableEditing: (isEditing) => dispatch(actionCreators.toggoleGradeTableEditing(isEditing)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeTable);