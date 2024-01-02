import useWindowPopup from "../theNew/popupWindow.js";

export const PopupView = () => {
	const handleClose = () => {
    window.close();
  };

	return (
		<>
			<div>
				<h1>윈도우 팝업을 누르셨군요! 😋</h1>
				<button onClick={handleClose}>닫기</button>
			</div>
		</>
	);
};