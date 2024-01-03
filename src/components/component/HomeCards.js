import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../styles/custom/homeCardCustom.js';

const data = [
  {
    id: `calendar`,
    link: `/calendar`,
    text: '캘린더'
  },
  // -------------------------------------------------
  {
    id: `none`,
    link: ``,
    text: '준비중 (무한 스크롤, 모달 팝업, 윈도우 팝업, 기간산정 기능, 그림판, 스톱워치)'
  }
];

const useHandleClick = () => {
  const navigate = useNavigate();

  const handleClick = useCallback((link) => {
    navigate(link);
  }, [navigate]);

  return { handleClick };
};


export const HomeCards = () => {
  const { handleClick } = useHandleClick();

  return (
    <>
      <div>
        <div style={{display: 'block', width: '100%', marginBottom: '6em', textAlign: 'center'}}>
          <p style={{fontSize: '2em', lineHeight: '6em'}}>프론트엔드 개발자를 꿈꾸는 이서안의 포트폴리오입니다.</p>
          <p style={{margin: '0.8em'}}>프로젝트에 대한 자세한 설명은 About 메뉴에 기록해 두었습니다.</p>
          <p style={{margin: '0.8em', fontSize: '0.8em'}}>기능 위주로 구현하여 디자인이 다소 미흡할 수 있습니다.</p>
        </div>

        <Card>
          <div className="grid">
            {data.map((dat) => (
              <div className="wrapper" key={dat.id} onClick={() => handleClick(dat.link)}>
                <div className="textWrapper">
                  {dat.text}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </>
  );
};

export default HomeCards;