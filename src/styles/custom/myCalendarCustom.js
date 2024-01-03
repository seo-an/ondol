import styled from 'styled-components';

const colorSun = '#ef6464';
const colorSat = '#5252eb';
const colorDefault = '#333';

const CalendarMain = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-content: flex-start;

  .wrapper {
    display: flex;
    width: 100%;
    margin: 8px;
  }

  .left {
    display: flex;
    width: 140px;
    height: 100%;
    flex-wrap: wrap;
    align-content: flex-start;

    .month {
      display: flex;
      width: calc(100% - 24px);
      height: 80px;
      margin: 0 16px 0 8px;
      justify-content: center;
      align-items: center;
      font-size: 4em;
    }

    .buttons {
      display: flex;
      width: 100%;
      height: fit-content;
      margin: 8px;
      justify-content: space-between;

      button {
        display: flex;
        line-height: 25px;
        height: 25px;
        align-items: center;
        justify-content: center;
        padding: 0px 8px;
        font-size: 0.8em;
        background-color: white;
        color: #939393;
        border-style: none;

        cursor: pointer;

        &:active {
          // box-shadow: 2px 2px 1px #bfbfbf;
          border-radius: 0px;
          border-bottom: 1px solid #bfbfbf;
        }
      }
    }
  }

  .right {
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    align-content: flex-start;

    &.title {
      margin: 8px;
      justify-content: flex-end;
      align-items: center;

      .year {
        display: flex;
        height: 38px;
        width: calc(120px - 16px);
        padding-right: 16px;
        align-items: center;
        justify-content: flex-end;
        font-size: 1.6em;
        background-color: #bbbb7c;
        color: white;
      }

      &:before {
        width: 0;
        height: 0;
        content: '';
        border-left: 19px solid transparent;
        border-top: 19px solid transparent;
        border-bottom: 19px solid transparent;
        border-right: 28.5px solid #bbbb7c;
      }
    }

    .grid-table {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;

      .cell {
        display: flex;
        height: 100px;
        opacity: 1;

        &.point {
          border: 1px solid #e3e3e3;
        }

        &.over {
          opacity: 0.4;
        }
      }

      .cell-text {
        display: block;
        width: 100%;
        height: fit-content;
        padding: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${colorDefault};

        &.day {
          width: calc(100%-16px);
        }

        &.sat {
          color: ${colorSat}
        }

        &.sun {
          color: ${colorSun}
        }
      }
    }
  }
`;

export default CalendarMain;