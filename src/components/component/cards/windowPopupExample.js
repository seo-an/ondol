import useWindowPopup from "../popupWindow.js";

const WindowPopExample = () => {
  const { openPopup } = useWindowPopup();

  const handleOpenPopup = () => {
    const url = '/popup-view';
    const name = "Window popup example";
    const options = "width=500, height=300"; // 팝업 옵션

    openPopup(url, name, options);
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Open Popup</button>
    </div>
  );
};

export default WindowPopExample;