
import { addActionNext } from "../Redux/action";
import { addActionPrev } from "../Redux/action";
import { currentDay } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
const Canlendar = (props) => {
   const dispatch = useDispatch();
   const month = useSelector((state) => state.month);
   const year = useSelector((state) => state.year);
   const dateSave = new Date ()
   const date = new Date(year, month, dateSave.getDate())
   date.setDate(1);
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   let currentMonth = months[month];
   let currentDate = new Date(year, month, dateSave.getDate()).toDateString();
   const handleNextMonth = () => {
      dispatch(addActionNext())
   }
   const handlePreMonth = () => {
      dispatch(addActionPrev())
   }
   const handleClick = (dataId) => {
      props.onShow(dataId)
   }
   const handleBack = () => {
      dispatch(currentDay())
   }
   function showTasksbyday(id) {
      let data = [];
      let listArray = [];
      let getLocalStorageData = localStorage.getItem("todo");
      if (getLocalStorageData) {
        listArray = JSON.parse(getLocalStorageData);
      }
      const checkList = listArray.filter(function (item) {
        return item.date === id
      });
    
      if (checkList.length) {
         checkList.map((item) => {
          return data.push(item.content)
        })
        const result = data[0].map((element, index) => {
         return (
             <li key={index}>
             {element}
             </li>
             )
       });
        return result;
      } else {
        return '';
      }
   }
   const showprevDay = () => {
      const prevDay = new Date(year, month, 0).getDate(); // số ngày tháng trước đó

      const firstDayIndex = date.getDay(); // trả ngày trong tuần (0 đến 6, cn là 0)
      const arrDay = [];
      for (let x = firstDayIndex; x > 0; x--) {
         arrDay.push(prevDay - x + 1)
      }
      const result = arrDay.map((item, index) => {
         return (
            <div onClick={(e) => handleClick(new Date(year,month -1,item).toDateString())} className="border border-dark pt-3 pb-5 prev-date" key={index} type="button">
               <div>{item}</div>
               <ul className= "task-menu">{showTasksbyday(new Date(year,month -1,item).toDateString())}</ul>
            </div>
         )
      })
      return result
   }
   const showCurrentDay = () => {
      const currentDay = new Date(
         year,
         month + 1,
         0
      ).getDate();
      const arrDay = [];
      for (let i = 1; i <= currentDay; i++) {
         arrDay.push(i)
      }
      const result = arrDay.map((item, index) => {
         if (item === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            return (
               <div onClick={(e) => handleClick(new Date(year,month,item).toDateString())} className="border-day border border-dark pt-3 pb-5 today" key={index}>
                  <div>{item}</div>
                  <ul className= "task-menu">{showTasksbyday(new Date(year,month,item).toDateString())}</ul>
               </div>
            )
         } else {
            return (
               <div onClick={(e) => handleClick(new Date(year,month,item).toDateString())} className="border-day border border-dark pt-3 pb-5" key={index}>
                  <div>{item}</div>
                  <ul className= "task-menu">{showTasksbyday(new Date(year,month,item).toDateString())}</ul>
               </div>
            )
         }
      })
      return result
   }
   const showNextDay = () => {
      const lastDayIndex = new Date(
         year,
         month + 1,
         0
      ).getDay();

      const nextDays = 7 - (lastDayIndex + 1);
      const arrDay = [];

      for (let j = 1; j <= nextDays; j++) {
         arrDay.push(j)
      }
      const result = arrDay.map((item, index) => {
         return (
            <div onClick={(e) => handleClick(new Date(year,month+1,item).toDateString())} className="border border-dark pt-3 pb-5 next-date" key={index}>
               <div>{item}</div>
               <ul className= "task-menu">{showTasksbyday(new Date(year,month+1,item).toDateString())}</ul>
            </div>
         )
      })
      return result
   }
   const showByYear = () => {
      props.showByYear()
   }

   return (
      <div className="calendar">
         <div className="header align-items-center">
            <div className="row">
               <div className="mb-3">
                  <button onClick={showByYear} className="btn btn-secondary btn-100">Year</button>
                  &emsp;
                  <button className="btn btn-secondary btn-100">Month</button>
               </div>
               <div className="month  d-flex align-items-center justify-content-between">
                  <i onClick={handlePreMonth} className="fas fa-angle-left prev"></i>
                  <div className="date">
                     <h1>{currentMonth}</h1>
                     <p onClick={handleBack}>{currentDate}</p>
                  </div>
                  <i onClick={handleNextMonth} className="fas fa-angle-right next"></i>
               </div>
            </div>
         </div>
         <div className="weekdays align-items-center text-center ">
            <div className="color-red">Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div className="color-red">Sat</div>
         </div>
         <div className="days text-center">
            {showprevDay()}
            {showCurrentDay()}
            {showNextDay()}
         </div>
      </div>
   )
}
export default Canlendar

