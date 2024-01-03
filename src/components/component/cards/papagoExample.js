import { useState, useRef } from 'react';

export const PapagoTransExample = () => {
	const [original, setOriginal] = useState(null);
	const [translated, setTranslated] = useState(null);

	const inputBinding = useRef(null);

	const postPapago = async ( event ) => {
		event.preventDefault();
	
		const URL_TO_NODE = '/api/papago';
		const korean = inputBinding.current.value;
		setOriginal(korean);

		const data = {
			source: 'ko',
			target: 'en',
			text: korean
		};
	
		try {
			const response = await fetch(URL_TO_NODE, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			}).then(res => {
				if (!res.ok) {
					throw new Error('HTTP POST ERROR :: status ', response.status);
				}
				return res.json(); // json 반환
			}).then(data => {
				return JSON.parse(data.responses); // 객체로 변환
			});
	
			return setTranslated(response.message.result.translatedText);
	
		} catch (error) {
			return console.error('CAN NOT TRY TO FETCH :: ', error);
		}
	};


	return (
		<>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
				<div style={{ width: '100%', margin: '4em', textAlign: 'center' }}>
					<h2>파파고 번역 API</h2>
				</div>

				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<div style={{ display: 'flex', width: '100%', margin: '0 0 2em 0', justifyContent: 'center' }}>
						<h3>한영 번역기</h3>
					</div>
					
					<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
						<form onSubmit={postPapago}>
							<input ref={inputBinding} type="text" placeholder="한국어 문장을 입력하세요." style={{ width: '300px', border: '0px' }}/>
							<button style={{display: "inline-flex", marginLeft: '8px'}} type="submit">번역</button>
						</form>
					</div>
				</div>
			

				{original && translated ?
					<div style={{ display: 'flex', width: '450px', margin: '4em 0', justifyContent: 'center' }}>
						<div style={{ width: '100%', textAlign: 'center' }}>
							<p>원문 : {original}</p>
							<p>번역 : {translated}</p>
						</div>
					</div> :
					<div style={{ display: 'flex', width: '450px', margin: '4em 0', justifyContent: 'center' }}>
						<div style={{ width: '100%', textAlign: 'center' }}>
							<p>번역할 내용이 없습니다.</p>
						</div>
					</div>
				}
			</div>
		</>
	);
}

export default PapagoTransExample;