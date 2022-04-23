import React, { useState } from "react";
const AddModal = (props) => {
    const [job, setJob] = useState('');
    const dataid = props.dataKey
    const handleSubmit = () => {
        let getLocalStorageData = localStorage.getItem("todo");
        let listArray = [];
        if (dataid === undefined) {
            return false
        }
        if (job.trim() === 0) {
            return false
        }
        if (getLocalStorageData != null) {
            listArray = JSON.parse(getLocalStorageData);
        }
        /// kieem tra id da ton tai chua 
        const checkList = listArray.filter(function (item) {
            return item.date == dataid
        });

        if (checkList.length) {
            // eslint-disable-next-line array-callback-return
            listArray.map((item) => {
                const task = { ...item };
                if (task.date == checkList[0].date) {
                    task.content.unshift(job);
                }
            });
        }
        else {
            listArray.push({
                date: dataid,
                content: [
                    job,
                ]
            })
        }
        localStorage.setItem("todo", JSON.stringify(listArray));
        setJob('')
        props.closeShow();
    }
    const handleEditTask = (e,index) => {
        props.showEdit(index);
        console.log(index)
    }
    const handleDeleteTask = (e,index) => {
        let getLocalStorageData = localStorage.getItem("todo");
        let listArray = JSON.parse(getLocalStorageData);
        const findId = listArray.filter(function (item) {
          return item.date == dataid
        });

        if (findId.length) {
          findId.map(function (item) {
                  item.content.splice(index, 1);
              })
        }
        // xóa nếu content rỗng
        listArray.map((item, index)=> {
          if(item.content == '') {
            listArray.splice(index,1);
          }
        })
        localStorage.setItem("todo", JSON.stringify(listArray));
        props.closeShow()
    }
    function showTasks(id) {
        let getLocalStorageData = localStorage.getItem("todo");
        let listArray = [];
        let dataTask = [];
        if (getLocalStorageData != null) {
            listArray = JSON.parse(getLocalStorageData);
        }
        const check = listArray.filter(function (item) {
            return item.date === id
        });
        if (check.length) {
            check.map((element) => {
                return dataTask.push(element.content);
            });
            const result = dataTask[0].map((element, index) => {
                return (
                    <li key={index}>
                        {element}
                        <button className="btnEdit"><i onClick={(e) => handleEditTask(e,index)} className="fa-solid fa-pen-to-square"></i></button>
                        <span className="icon"><i onClick={(e) => handleDeleteTask(e,index)} className="fas fa-trash"></i></span>
                    </li>
                )
            });
            return result
        }

    }

    return (
        <div className="modalAdd">
            <div className="showTask">
                <div className="icon"><i onClick={props.closeShow} className="fa-solid fa-xmark"></i></div>
                <h1 className="mt-5">To do list</h1>
                <div className="aa">
                    <p>{props.dataKey}</p>
                </div>
                <div className="inputField">
                    <input value={job} onChange={(e) => setJob(e.target.value)} type="text" placeholder="Enter New Task"></input>
                    &emsp;
                    <button onClick={handleSubmit} className="btn btn-secondary">Add</button>
                </div>
                <ul className="todoList mt-5">
                    {showTasks(dataid)}
                </ul>
            </div>
        </div>
    )
}
export default AddModal