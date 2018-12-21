import styled from 'styled-components';

export const padding = "5px"

export const mAppBarHeight = '56px';
export const appBarHeight = '64px';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${padding};
  
  height: calc(100vh - ${mAppBarHeight});
  overflow: hidden;
  @media screen and (min-width: 576px){
    &{
      height: calc(100vh - ${appBarHeight});
    }
  }
`;

export default Section;