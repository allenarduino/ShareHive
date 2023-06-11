import styled from "styled-components";

export const LayoutBackground = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100hv;
  column-gap: 1rem;
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: auto;
  column-gap: 1rem;
  width: 90%;
  position: relative;
  top: 0px;
`;

export const LeftColumn = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 600px;
  position: sticky;
  top: 0px;
`;

export const RightColumn = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 600px;
  position: sticky;
  top: 0px;
`;

export const MiddleColumn = styled.div`
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
