import useMyCalendar from "./calendar.js";
import CalendarMain from "../../../styles/custom/myCalendarCustom.js";

const MyCalendar = () => {
	const { year, month, week, calendarPage, buttonText, flipOver } = useMyCalendar();

	return (
    <>
      <div>
        <h1>리액트 캘린더</h1>

        <CalendarMain>
          <div className="title right">
            <div className="year">{year}</div>
          </div>

          <div className="wrapper">
            <div className="left">
              <div className="month">{(month < 10 ? ('0' + month) : month)}</div>
              <div className="buttons">
                <button onClick={flipOver}>{buttonText.prev}</button>
                <button onClick={flipOver}>{buttonText.today}</button>
                <button onClick={flipOver}>{buttonText.next}</button>
              </div>
            </div>

            <div className="right">
              <div className="grid-table">
                {week.map((item, index) => (<div className="cell-text day" key={index}>{item}</div>))}
                {calendarPage.map((item) => { 
                  if (item.month < month - 1 || item.month > month - 1) {
                    return (<div className="cell over" key={item.id}>
                      {item.day === 0 ? <div className="cell-text sun">{item.date}</div> : (item.day === 6 ? <div className="cell-text sat">{item.date}</div> : (<div className="cell-text">{item.date}</div>))}
                    </div>)
                  } else if (item.onToday) {
                    return (<div className="cell point" key={item.id}>
                      {item.day === 0 ? <div className="cell-text sun">{item.date}</div> : (item.day === 6 ? <div className="cell-text sat">{item.date}</div> : (<div className="cell-text">{item.date}</div>))}
                    </div>)
                  } else {
                    return (<div className="cell" key={item.id}>
                      {item.day === 0 ? <div className="cell-text sun">{item.date}</div> : (item.day === 6 ? <div className="cell-text sat">{item.date}</div> : (<div className="cell-text">{item.date}</div>))}
                    </div>)
                  }
                })}
              </div>
            </div>
          </div>

        </CalendarMain>
      </div>
    </>
  );
}

export default MyCalendar;