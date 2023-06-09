import styled from "styled-components";

export const CommentBackground = styled.div`
  @media (min-width: ${769}px) {
    display: flex;
    background: rgba(0, 0, 0, 0.9);
  }
  flex: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  position: fixed;
`;

export const BackArrowContainer = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

export const CommentContainer = styled.div`
  @media (min-width: ${769}px) {
    align-self: center;
    max-width: 500px;
  }
  height: 90vh;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  padding-bottom: 100px;
  overflow: auto;
  overflow-y: scroll;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  bottom: 0px;
  left: 0;
  right: 0;
  position: fixed;
`;

export const CommentInput = styled.textarea`
  width: 80%;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 20px;
  padding-left: 10px;
  border-radius: 20px;
`;

export const EmptyCommentFeedBack = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 250px;
  position: sticky;
`;
