import styled, { css } from "styled-components"

export const RootLayoutContainer = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: space-between;
`;

export const PageLayout = styled.div`
  width: 100%;
  display: flex;
  height: 100dvh;
  flex-direction: column;
`;
export const ChatContainer = styled.div`
  gap: 5px;
  width: 100%;
  color: white;
  display: flex;
  height: 100dvh;
  overflow: hidden;
  /* background-color: #202020; */
  background-color: #27272A;
  justify-content: space-between;
`
export const LoginContainer = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #202020;
  @media screen and (max-width: 1023px) {
    background-color: white;
  }
`
export const UiForm = styled.div`
  gap: 20px;
  width: 100%;
  padding: 40px;
  display: flex;
  max-width: 480px;
  border-radius: 10px;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.1);
  @media screen and (max-width: 1023px) {
    box-shadow: none;
  }
`
export const UiInputLabel = styled.span<{ isInvalid: boolean; isFocus: boolean }>`
  width: 100%;
  color: ${({ isInvalid, isFocus }) =>
    isInvalid ? (isFocus ? 'orange' : '#d9534f') : '#27272a'};
`;
export const UiInputErrorText = styled.span<{ isFocus: boolean }>`
  color: ${({ isFocus }) => (isFocus ? 'orange' : '#d9534f')};
`;
export const UiInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

export const UiInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 46px;
  overflow: hidden;
`;
export const UiInputField = styled.input<{
  isInvalid: boolean;
  isFocus: boolean;
  hasPrefixIcon: boolean;
  hasSuffixIcon: boolean;
}>`
  outline: none;
  width: 100%;
  height: 100%;
  max-width: 550px;
  border: 1px solid ${({ isInvalid, isFocus }) => isInvalid ? (isFocus ? 'orange' : '#d9534f') : '#27272a'};
  border-radius: 8px;
  background-color: '#ffffff';
  color: ${({ isInvalid, isFocus }) => isInvalid ? (isFocus ? 'orange' : '#d9534f') : '#27272a'};
  padding: 0 ${({ hasSuffixIcon }) => (hasSuffixIcon ? '60px' : '16px')} 0 ${({ hasPrefixIcon }) => (hasPrefixIcon ? '60px' : '16px')};
  font-size: 16px; 
  ${({ isInvalid, isFocus }) => isInvalid && isFocus &&
    css`
      border-color: orange;
    `}
`;

export const UiInputIconWrapper = styled.div<{ position: 'prefix' | 'suffix' }>`
  position: relative;
  width: 24px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right:  ${({ position }) =>
    position === 'prefix' ? '-24px' : '-44px'};
  transform:  translateX(${({ position }) =>
    position === 'prefix' ? '14px' : '-44px'});
`;
export const UiTitle = styled.span`
  width: 100%;
  color: #27272a;
  font-weight: 600;
  font-size: 26px;
  text-align: center;
`
export const UiSubtitle = styled.span`
  width: 100%;
  color: #27272a;
  padding: 0px 20px;
  text-align: center;
`
export const UiButton = styled.button`
  width: 100%;
  color: white;
  cursor: pointer;
  font-size: 18px;
  max-width: 550px;
  font-weight: 600;
  text-align: center;
  padding: 10px 20px;
  border-radius: 7px;
  transition: .3s linear;
  border: 1px solid #27272a;
  background-color: #27272a;
  &:hover {
    filter: opacity(90%);
  }
`