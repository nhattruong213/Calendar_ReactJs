import { useState } from "react"
const EditModal = (props) => {
    const datid = props.dataKey;
    const index = props.dataIndex;
    const [contentEdit, setContentEdit] = useState(props.content);
    const handleEdit = () => {
        let listArray = [];
        let getLocalStorageData = localStorage.getItem("todo");
        listArray = JSON.parse(getLocalStorageData);
      
        const findId = listArray.filter(function (item) {
          return item.date === datid
        });
      
        if (findId.length) {
          if (contentEdit.trim()!=0){
            findId.map((item) => {
              item.content[index] =contentEdit
            })
          }
        }
        localStorage.setItem("todo", JSON.stringify(listArray));
        props.closeEdit()
    }
    return (
        <div className="modalAdd">
            <div className="showTask">
                <div className="icon"><i onClick={props.closeEdit} className="fa-solid fa-xmark"></i></div>
                <h1 className="mt-5">Edit Task</h1>
                <div className="aa">
                    <p>{props.dataKey}</p>
                </div>
                <div className="inputField">
                    <input onChange={(e) => setContentEdit(e.target.value)} value={contentEdit} type="text" placeholder="Enter New Task"></input>
                    &emsp;
                    <button onClick={handleEdit} className="btn btn-secondary">Edit</button>
                </div>
            </div>
        </div>
    )
}
export default EditModal