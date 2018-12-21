import styled from 'styled-components';

const Message = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  background-color: rgba(0,0,0,0.8);
  color: white;
  height: 40px;
  padding: 5px;
  border-radius: 30px;
  position: fixed;
  z-index: 998;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

export default Message;
