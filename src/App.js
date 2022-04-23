
import './App.css';
import Canlendar from './Components/Calendar';
import AddModal from './Components/AddModal';
import './Styles/index.css';
import { useState } from 'react';
import EditModal from './Components/EditModal';
import CanlendarByYear from './Components/CalendarYear';
function App() {
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [indexEdit, setIndexEdit] = useState();
  const [content, setContent] = useState('');
  const [showYear, setShowYear] = useState(false);
  const handleClick = (data) => {
    setKey(data)
    setShow(true);
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShowEdit =(index) => {
    setShowEdit(!showEdit)
    setIndexEdit(index)
    setShow(!show)

    let listArray = []
    let getLocalStorageData = localStorage.getItem("todo");
    listArray = JSON.parse(getLocalStorageData);
  
    const findId = listArray.filter(function (item) {
      return item.date === key
    });
  
    if (findId.length) {
      let check = findId.map((item) => {
        return item.content[index];
      })
      setContent(check)
    }
  }
  const handleCloseEdit = () => {
    setShowEdit(!showEdit);
  }
  const handleShowYear = () => {
    setShowYear(!showYear);
  }
  return (
    <div>
      <Canlendar
      showByYear = {handleShowYear}
      onShow={handleClick}/>
      {show && <AddModal 
                closeShow = {handleClose}
                showEdit = {handleShowEdit}
                dataKey = {key} />}
      {showEdit && <EditModal 
                content = {content}
                dataKey = {key}
                dataIndex = {indexEdit}
                closeEdit = {handleCloseEdit}
                />}
      {showYear && <CanlendarByYear showByYear = {handleShowYear} />}
    </div>
  );
}

export default App;
