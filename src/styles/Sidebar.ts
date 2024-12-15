import styled from "styled-components";

export const SidebarLogoutButton = styled.button`
  gap: 10px;
  color: white;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #27272a;
  border-radius: 7px;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;

  &.wide {
    width: 80%;
  }

  &.narrow {
    width: 60%;
  }

  &:hover {
    background-color: #27272a;
  }
`;

export const SidebarItem = styled.button`
  gap: 10px;
  color: white;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  align-items: center;
  padding: 10px 15px;
  border: none;
  border-radius: 7px;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;

  &.wide {
    width: 100%;
    justify-content: flex-start;
  }

  &.active {
    background: #27272a;
  }
  
  &.narrow {
    width: 80%;
    justify-content: center;
  }

  &:hover {
    background-color: #27272a;
  }
`;

export const SidebarUiTitle = styled.span`
  color: #8a8a93;
  font-size: 18px;
`;

export const SidebarGroups = styled.div`
  gap: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;

  &.centered {
    align-items: center;
  }

  &.aligned-start {
    align-items: flex-start;
  }
`;

export const SidebarLogoWithControls = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SidebarControls = styled.div`
  width: 80%;
  display: flex;
  color: white;
  align-items: center;
  justify-content: flex-end;
`;

export const OpenSidebar = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  background-color: #202020;
  transform: translateX(30px);
  border: 1px solid rgba(255,255,255,0.3);
`;

export const CloseSidebar = styled(OpenSidebar)`
  transform: translateX(40px);
`;

export const SidebarItemsGroups = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  min-height: 70dvh;
  align-items: center;
  flex-direction: column;
`;

export const SidebarLayout = styled.div`
  gap: 20px;
  display: flex;
  max-width: 230px;
  align-items: center;
  flex-direction: column;
  padding: 10px 0px 30px 0px;
  background-color: #202020;
  justify-content: space-between;
  transition: width 0.3s ease-in-out;
  border-right: 1px solid rgba(255,255,255,0.1);
  &.open {
    width: 80%;
  }

  &.closed {
    width: 80px;
  }

  * {
    transition: 0.3s linear;
  }
  @media screen and (max-width: 767px) {
    &.open {
      height: 100%;
      position: absolute;
    }
  }
`;