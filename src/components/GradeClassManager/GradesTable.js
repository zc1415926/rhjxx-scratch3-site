import React from 'react';
import MaterialTable from 'material-table';

export default function GradeTable(props) {
    const [state, setState] = React.useState({
        columns: [
          { title: '班级Id', field: 'gradeNum' },
          { title: '班级名称', field: 'gradeName' },
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
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}