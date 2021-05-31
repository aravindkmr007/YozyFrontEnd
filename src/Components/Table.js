import React, { useState } from "react";
import "./Table.css";
import MaterialTable from "material-table";
import EditingForm from "./EditingForm"
import DeleteForm from "./DeleteForm";
function Table({Data}) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [Editing, setEditing] = useState(false)
    const [Delete, setDelete] = useState(false)
    const [Values, setValues] = useState({});  
    const handleSelection = (Olddata,index) =>
    {
      setValues(Olddata);
      (index === "Editor")? handleEditing(): handleDelete()
    }
    const handleEditing = () =>
    {
      setEditing(!Editing)
    }
    const handleDelete = () =>
    {
      setDelete(!Delete)
    }
    const Columns = [
        { title: "Employee ID", field: "id", type: 'numeric'},
        { title: "FirstName", field: "firstname" },
        { title: "LastName", field: "lastname" },
        { title: "Gender", field:"gender" },
        { title: "Date of Birth", field: "DoB" },
        { title: "PAN CARD", field: "Pan" },
        { title: "AADHAAR NUMBER ", field: "Aadhaar", type: 'numeric' },
        { title: "ADDRESS", field: "Address" },
        { title: "Email", field: "email" },
        { title: "Phone Number", field: "Phone", type: 'numeric' },
        { title: "Empolyee Pic", field: "emp_Photo",render: rowData => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            style={{ height: "30px",width: "30px", borderRadius: '50%',objectFit : "contain"}}
            src = {process.env.PUBLIC_URL + rowData.emp_Photo}
          />
        ),
}
      ];
    return (
        <div className="Table">
            <MaterialTable
                title={"Employee Details"}
                columns={Columns.map((e) => e)}
                data={Data === "" ? "" : Data.map((e) => e)}
                options={{
                exportAllData: true,
                exportButton: true,
                columnResizable: true,
                filtering: false,
                actionsColumnIndex: -1,
                rowStyle: rowData => ({
                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                  }),
                  headerStyle: {
                    backgroundColor: '#01579b',
                    color: 'white',
                    textAlign : "center",
                    fontSize: "12px",
                    padding:"10px"
                  },
                  cellStyle: {
                    textAlign : "center",
                    fontSize : "10px",
                    padding:"10px",
                  }
                  
                }}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                actions={[
                {
                    icon: 'edit',
                    tooltip: 'Editing',
                    onClick: (event, rowData) => handleSelection(rowData, "Editor")
                },
                {
                    icon: 'delete',
                    tooltip: 'Deleting',
                    onClick: (event, rowData) => handleSelection(rowData, "Delete")
                }
                ]}
            />
            <EditingForm FormOpen={Editing} setFormOpen={setEditing}  setValues={setValues} Values={Values}/>
            <DeleteForm FormOpen={Delete} setFormOpen={setDelete} Values={Values} />

            
        </div>
    )
}

export default Table
