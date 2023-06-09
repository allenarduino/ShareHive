import styled from "styled-components";

export const PostCardDesign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 10px 0;
  margin-top: 30px;
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

export const PostCardContent = styled.div`
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

export const LineBox = styled.div`
  width: 80%;
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

export const Date = styled.span`
  font-size: 13px;
  white-space: nowrap;
  line-height: 1.8;
`;

export const Delete = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const Delete_Background = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  visibility: hidden;
`;

/*i {
    position: absolute;
    right: 8px;
    top: 8px;
    display: inline-block;
  }

  .background {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    visibility: hidden;
  }
*/

export const Line2 = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  line-height: 1.3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  white-space: pre-line;
`;
export const Line3 = styled.div`
  width: 100%;
  height: auto;
  max-height: 300px;
  overflow: hidden;
  border-radius: 15px;
`;

export const PostImage = styled.div`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const Line4 = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: row;
  width: 130px;
  justify-content: space-around;
  margin-top: 10px;
  padding-bottom: 10px;
`;

export const HeartWrapper = styled.div`
  position: absolute;
  margin-left: 50px;
  margin-top: 50px;
  animation: pulse 1s infinite;
`;

export const CommentBackground = styled.div`
  position: absolute;
  top: -7px;
  left: -7px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: none;
`;

/*******Section For Comment Modal on Phone************ */

export const BottomSheetContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  overflow-y: scroll;
`;
export const FormContainer = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  height: 30px;
  bottom: 0;
  margin-top: auto;
  position: sticky;
`;

export const CommentInput = styled.textarea`
  width: 80%;
  max-width: 600px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`;

export const SubMit = styled.input`
  width: 20%;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  border: 2px solid #e3405f;
  background-color: #e3405f;
`;
