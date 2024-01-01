import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
  {
    id: `calendar`,
    link: `/calendar`,
    text: '캘린더'
  },
  {
    id: `svg-component`,
    link: `/svg-component`,
    text: '컴포넌트형 SVG'
  },
  {
    id: `modal`,
    link: `/modal`,
    text: '모달 팝업'
  },
  {
    id: `window-popup`,
    link: `/window-popup`,
    text: '윈도우 팝업'
  },
  // -------------------------------------------------
  {
    id: `none`,
    link: ``,
    text: '준비중 (무한 스크롤, 기간산정 기능, 그림판, 스톱워치)'
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
        <div style={{display: 'block', width: '100%', height: '8em', textAlign: 'center'}}>
          <p style={{fontSize: '2em', lineHeight: '3em'}}>프론트엔드 개발자를 꿈꾸는 이서안의 포트폴리오입니다.</p>
          <p>프로젝트에 대한 자세한 설명은 About 메뉴에 기록해 두었습니다.</p>
          <p style={{fontSize: '0.8em'}}>기능 위주로 구현하여 디자인이 다소 미흡할 수 있습니다.</p>
        </div>
        <div>
          {data.map((dat) => (
            <div key={dat.id} onClick={() => handleClick(dat.link)} style={{cursor: 'pointer'}}>
              <div style={{textDecoration: 'none', textDecorationColor: 'inherit', color: 'inherit', padding: '16px'}}>
                {dat.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeCards;