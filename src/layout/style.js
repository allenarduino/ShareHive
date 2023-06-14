import styled from "styled-components";

export const LayoutBackground = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  column-gap: 1rem;

  @media (max-width: ${800}px) {
    min-height: 100vh;
    height: 100%;
  }
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: auto;
  column-gap: 1rem;
  width: 90%;
  position: relative;
  top: 0px;
  @media (max-width: ${800}px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 600px;
  position: sticky;
  top: 0px;
  @media (max-width: ${800}px) {
    display: none;
  }
`;

export const RightColumn = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 600px;
  position: sticky;
  top: 0px;
  @media (max-width: ${800}px) {
    display: none;
  }
`;

export const MiddleColumn = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  padding-bottom: 100px;
`;
