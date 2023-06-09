import styled from "styled-components";

export const CommentCardDesign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;

export const UserImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50px;
`;

export const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const Content = styled.div`
  width: 100%;
  padding-left: 10px;
  overflow: hidden;
`;

export const Line1 = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Line1Box = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
`;
export const UserName = styled.div`
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
`;

export const Time = styled.div`
  font-size: 13px;
  white-space: nowrap;
  line-height: 1.8;
`;

export const Delete = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const Background = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  visibility: hidden;
`;

export const Line2 = styled.div`
  font-size: 15px;
`;

export const Line2Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const Line2Text = styled.div`
  font-weight: 400;
  white-space: nowrap;
  margin-right: 5px;
`;

export const Line2AuthorName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Line2Content = styled.div`
  overflow-wrap: break-word;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.3125;
  white-space: pre-line;
`;
