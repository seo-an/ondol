import styled, { keyframes } from "styled-components";

const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-1px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(1px);
  }
`;

export const Card = styled.div `
	display: flex;
	width: 100%;
	height: 100%;
	margin: 30px 0 60px 0;
	justify-content: space-evenly;
	animation: ${shakeAnimation} 1s ease-in-out;

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		row-gap: 20px;
		column-gap: 10px;

		.wrapper {
			display: flex;
			width: 150px;
			height: 170px;
			padding: 16px 24px;
			align-items: center;
			justify-content: center;
			border: 1px solid #e1e1e1;
			border-radius: 3px;
			cursor: pointer;

			.textWrapper {
				display: flex;
				width: 200px;
				height: fit-content;
				justify-content: center;
			}
		}
	}
`;

export default Card;