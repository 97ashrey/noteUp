import styled from 'styled-components';

const AppWrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  overflow: hidden;
  position: relative;
  @media screen and (min-width: 576px){
    &{
      width: 600px;
      margin: 0 auto;
      box-shadow: 0px 0px 2px 2px #ccc;
    }
  }
`;

export default AppWrapper;