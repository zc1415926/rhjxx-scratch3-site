import React from 'react';
import MaterialTable from 'material-table';

export default function GradeTable(props) {
    const [state] = React.useState({
        columns: [
          { title: 'gradeNum', field: 'gradeNum' },
          { title: 'gradeName', field: 'gradeName' },
        ],
        //data: props.GradeData
      });

  return (
    <MaterialTable
      title="年级信息表"
      columns={state.columns}
      //props一更新，表格的显示就可以一起更新
      data={props.GradeData}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            resolve();
            props.postGradeHandler(newData);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            resolve();
            //console.log('oldData=>',oldData);
            //console.log('newData=>',newData);
            props.putGradeHandler(newData)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            resolve();
            props.deleteGradeHandler(oldData.id);
          }),
      }}
    />
  );
}