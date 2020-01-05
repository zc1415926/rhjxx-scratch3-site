import React from 'react';
import MaterialTable from 'material-table';

export default function ClassesTable(props) {
    const [state, setState] = React.useState({
        columns: [
          { title: 'ID', field: 'classNum' },
          { title: 'Name', field: 'className' },
        ],
        //data: props.classesData
      });
  return (
    <MaterialTable
      title={props.grade+'级班级信息表'}
      columns={state.columns}
      //不要把data放到state里，这样就只能更新一次数据，后边的更新就显示不出来了
      //data={state.data}
      data={props.classesData}
      /* 不显示搜索框 */
      options={{
        search: false
      }}
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