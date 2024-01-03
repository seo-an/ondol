import styled from 'styled-components';

export const Container = styled.div `
  display: flex;
  width: calc(100% - 64px);
  min-height: calc(100% - 96px);
  padding: 48px 32px;
  flex-wrap: wrap;
`;

export const Title = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  
  
  & span {
    font-size: 2em;
    line-height: 4em;
  }
`;

export const Paragraph = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  margin: 8px 0;
  flex-wrap: wrap;

  & p {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    line-height: 2em;
  }
`;

export const Subtitle = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  
  & span {
    font-size: 1.2em;
    line-height: 2.4em;
  }
`;


const About = () => {
  return (
    <>
      <Container>
        {/* <Title><span>프론트엔드 개발자를 꿈꾸는 이서안의 포트폴리오입니다.</span></Title> */}
        <Title><span>Project,</span></Title>
        <Paragraph>
          <Subtitle><span>이 프로젝트는요,</span></Subtitle>
          <p>Node.js와 React로 이루어졌습니다. 
            Node.js는 npm으로 통용되는 package manager를 제공합니다. 
            npm이 제공하는 package.json으로 쉽게 다양한 패키지와 모듈을 관리하고 프로젝트에 적용할 수 있습니다. 
            또한 간단한 커맨드 스크립트를 사전에 작성해두어 npm run 명령어로 쉽게 build 하고, 구동해 볼 수 있다는 점. 
            그리고 React 서버와 Node.js 서버를 동시에 띄울 수 있다는 점 등이 실제 배포를 염두에 두는 React 프로젝트를 관리하기에 적합하다고 판단하여 Node.js를 선택했습니다. 
            물론 Node.js가 커뮤니티에서 정보를 얻기 용이하고, 다양한 온라인 강의를 접할 수 있는 등 진입 장벽이 높지 않은 것도 선택에 영향을 주었습니다.</p>
        </Paragraph>
        <Paragraph>
          <p>React 역시 커뮤니티가 활발하고 다양한 확장 라이브러리를 제공하고 있습니다. 
            이 프로젝트를 시작할 때에는 React 커뮤니티가 가장 컸기 때문에 React를 선택했습니다. 
            혼자 프로젝트를 진행하는 저에게는 커뮤니티의 규모가 중요했습니다. 검색이 저의 동료이며 사수이기 때문입니다. 
            또한 React가 세상에 나온지 시일이 흘렀기 때문에 무료로 React에 대해서 배울 수 있는 기회가 많은 것도 주요했습니다.
          </p>
          <p>
            SPA의 프론트엔드 라우팅도 React를 선택하는데 핵심적인 이유가 됐습니다. 
            SPA의 페이지 전환은 사용자의 경험과도 주요한 연관이 있지만, 저에게는 백엔드 개발자가 없는 환경에서 큰 이점이 되었기 때문입니다.
            React Router로 페이지 전환을 처리할 수 있었기 때문에 백엔드 개발에서는 CRUD와 관련된 부분만 작성하면 되었습니다. 
            혼자 진행하는 프로젝트여도 React에 더 집중할 수 있었습니다.
          </p>
        </Paragraph>
        <Paragraph>
          <p>커스텀 훅을 적극적으로 사용했습니다. 재사용 여부 외에도 코드를 간결하게 보이게 만드는 목적으로도 사용하였습니다.</p>
          <p>일반 함수와 비교했을 때 React의 상태관리라는 장점을 가져가면서 함수형으로 모듈화하여 사용할 수 있다는 점이 좋았습니다.</p>
        </Paragraph>
        <Paragraph>
          <Subtitle><span>with,</span></Subtitle>
          <p>이 프로젝트는 AWS Lightsail을 통해 호스팅 되고 있습니다.</p>
          <p>이 프로젝트는 정적 파일 배포, Proxy, Reverse Proxy, HTTPS 통신 등을 위해 Nginx를 웹서버로 이용하고 있습니다.</p>
          <p>이 프로젝트는 Lightsail에서 제공하는 MySQL 데이터베이스와 연결되어 있습니다.</p>
          <p>AWS의 Cloud Watch와 AWS Lambda 함수로 5분에 한 번씩 인스턴스의 상태를 점검하고, PM2로 백그라운드에서 프로세스를 관리합니다. 인스턴스가 다운되고 5분이 지나면 저에게 sms로 문자로 알림이 오며, 인스턴스가 자동으로 재시작됩니다. 인스턴스가 시작되면 PM2가 자동으로 Node.js 프로세스를 시작하기 때문에 결과적으로 중단 없이 배포되고 있습니다.</p>
        </Paragraph>
        <Paragraph>
          <Subtitle><span>Layout,</span></Subtitle>
          <p>이 프로젝트는 최소 너비와 최대 너비가 제한된 반응형 웹으로, 모바일 페이지를 별도로 지원하지는 않습니다. 
            최소 너비보다 화면이 줄어든다면 좌우 스크롤이 생기고, 최대 너비보다 화면의 너비가 늘어난다면 내용이 담긴 영역이 가운데에 정렬되게 됩니다.</p>
          <p>Layout은 상단에 nav 메뉴바, 중앙에 main 컨텐츠, 하단에 footer를 가지는 전통적인 구조를 따랐습니다.</p>
        </Paragraph>

        <Title><span>Pages</span></Title>
        <Paragraph>
          <Subtitle><span>Home,</span></Subtitle>
          <p>
            Home 화면에서는 제가 구현해 본 기능들을 편안하게 확인하실 수 있도록 카드식으로 나열해 보았습니다. 각 카드를 클릭하시면 해당 내용을 확인하실 수 있습니다.
          </p>
        </Paragraph>
        <Paragraph>
          <Subtitle><span>API 포트폴리오,</span></Subtitle>
          <p>API 포트폴리오 화면에는 공공 API 데이터를 활용한 기능이 구현되어 있습니다.</p>
          <p>탭 기능을 추가하여 탭을 클릭했을시 컴포넌트를 별도로 불러오고 있습니다.</p>
        </Paragraph>
        <Paragraph>
          <Subtitle><span>REST API 포트폴리오,</span></Subtitle>
          <p>REST API 포트폴리오 화면에는 데이터베이스 CRUD가 구현되어 있습니다.</p>
          <p>React.js에서 fetch로 요청을 보내면 Nginx를 타고 백엔드 서버인 Node.js로 보내집니다.</p>
          <p>조회, 작성, 삭제, 수정 요청은 Node.js에서 get, post, delete, put으로 처리됩니다. (put이 더 데이터 안정성이 높다고 판단하여 patch 대신 적용하였습니다.)</p>
          <p>작성해주신 방명록은 AWS Lightsail에 연결된 MySQL RDS Database에 저장됩니다.</p>
          <p>숫자나 자음 등 의미 없는 내용도 괜찮으니 마음껏 사용해주세요.</p>
        </Paragraph>

        <Title><span>마치며,</span></Title>
        <Paragraph>
          <p>저에 대해 더 알고싶으시다면 하단의 Github 링크, Notion 링크 등을 이용해주세요.</p>
          <p>한 걸음 더 나아가는 만큼, 한 가지 더 구현하여 적용할 예정이니 생각나실 때 한 번씩 찾아와 주시면 감사하겠습니다!</p>
        </Paragraph>
      </Container>
    </>
  )
}

export default About;