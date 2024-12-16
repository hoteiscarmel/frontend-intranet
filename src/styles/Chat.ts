import styled from "styled-components"

export const ChatWhiteContactName = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 600;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ChatWhiteSubTitle = styled.span`
  color: white;
  font-size: 22px;
  font-weight: 700;
`
export const ChatWhiteTitle = styled.span`
  color: white;
  font-size: 24px;
  font-weight: 700;
`
export const ChatSilverMessage = styled.span`
  color: #cfcfcf;
  font-size: 16px;
  max-width: 600px;
  font-weight: 400;
`
export const ChatLinkText = styled.div`
  width: 100%;
  color: #99ebff;
  max-width: 400px;
  font-weight: 200;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ChatBetweenText = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const ChatContactLabels = styled.div`
  gap: 5px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  ${ChatWhiteContactName} {
    max-width: 100%;
  }
  ${ChatSilverMessage} {
    text-align: left;
  }
`
export const ChatContactPicture = styled.img<{ backgroundColor: string }>`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 3px solid ${({ backgroundColor }) => backgroundColor};
`
export const ChatPrevImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 50px;
  border-radius: 5px;
`
export const ChatAssetContent = styled.div`
  width: 55px;
  height: 50px;
  overflow: hidden;
  border-radius: 5px;
  margin-left: 10px;
`
export const ChatNoMessageView = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${ChatSilverMessage} {
    gap: 10px;
    max-width: 75%;
  }
  .asset-message {
    max-width: 160px;
    text-align: left;
  }
`
export const ChatScrolled = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  height: 100%;
  /* overflow-y: scroll; */
  align-items: center;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 8px; /* Largura da barra de rolagem */
    height: 8px; /* Altura para scroll horizontal */
  }

  /* Fundo do scroll bar */
  &::-webkit-scrollbar-track {
    background: transparent; /* Cor do fundo */
    border-radius: 10px; /* Bordas arredondadas */
  }

  /* O controle que você pode rolar */
  &::-webkit-scrollbar-thumb {
    background: #888; /* Cor da barra */
    border-radius: 10px; /* Bordas arredondadas */
  }

  /* Hover na barra */
  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Cor ao passar o mouse */
  }
`
export const ChatItemBox = styled.button`
  gap: 5px;
  width: 100%;
  border: none;
  display: flex;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 10px;
  align-items: center;
  transition: .3s linear;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.favorite-item {
    width: 112%;
    margin-left: -6%;
  }
  &.contact-item {
    gap: 15px;
    flex-direction: row;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`
export const ToolGroup = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`
export const ToolIcon = styled.button<{ backgroundColor: string }>`
  border: none;
  gap: 10px;
  padding: 8px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: .3s linear;
  flex-direction: column;
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`
export const ChatSidebarContainer = styled.div`
  gap: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #202020;
  padding: 20px 10px;
  justify-content: space-between;
`
export const RoomMobile = styled.div<{ isMobileRoom: boolean }>`
  width: 100%;
  height: 100%;
  position: ${(props) => (props.isMobileRoom ? 'absolute' : 'relative')};
`
export const RoomWithoutCalls = styled.div`
  gap: 15px;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 30px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #2c2c2c;
  ${ChatSilverMessage} {
    text-align: center;
  }
`
export const ChatIconButton = styled.button`
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: .3s linear;
  background-color: transparent;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`
export const ChatRoomWithBackground = styled.div``
export const ChatRoomHeaderProfile = styled.div``
export const ChatCurrentPicture = styled.img<{ backgroundColor: string }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid ${({ backgroundColor }) => backgroundColor};
`
export const ChatMyMessage = styled.div``
export const ChatNotMyMessage = styled.div``
export const ChatMessageLine = styled.div<{ alignItems: string }>`
  width: 100%;
  display: flex;
  padding: 0px 20px;
  max-width: 1100px;
  justify-content: ${({ alignItems }) => alignItems};
`
export const ChatRoomHeader = styled.div``
export const ChatRoomInput = styled.input``
export const ChatRoomSearch = styled.div``
export const ChatRoomContent = styled.div``
export const ChatRoomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2c2c2c;
  justify-content: space-between;
  ${ChatRoomSearch} {
    width: 100%;
    height: 55px;
    display: flex;
    padding: 0px 20px;
    background-color: #2c2c2c;
    border-top: 1px solid rgba(0,0,0,0.5);
  }
  ${ChatRoomHeader} {
    width: 100%;
    height: 65px;
    display: flex;
    padding: 30px 20px;
    align-items: center;
    background-color: #2c2c2c;
    border-bottom: 1px solid rgba(0,0,0,0.5);
  }
  ${ChatRoomInput} {
    width: 100%;
    color: white;
    border: none;
    min-height: 40px;
    background-color: #2c2c2c;
    &::placeholder {
      color: rgba(255, 255, 255,0.6);
    }
    &:focus {
      &::placeholder {
        color: rgba(255, 255, 255, 0.5); /* 80% de opacidade */
      }
    }
  }
  ${ChatRoomHeaderProfile} {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${ChatWhiteContactName} {
      max-width: 100%;
    }
  }
  ${ChatRoomWithBackground} {
    position: relative; /* Necessário para o pseudo-elemento */
    width: 100%;
    height: 100%;
    padding: 0px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-position: center;
    background-size: contain;
    background-image: url('./wallpaper-white.png');
    ${RoomWithoutCalls} {
      overflow: hidden;
      z-index: 1;
      background-color: rgba(0,0,0,0.9);
      &::before {
        width: 100%;
        height: 100%;
        content: '';
        z-index: -1;
        background-color: rgba(255, 255, 255,0.15);
        position: absolute;
      }
    }
  }
  ${ChatRoomContent} {
    gap: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: auto;
    padding-bottom: 20px;
    align-items: center;
    flex-direction: column;
    background-color: rgba(32, 32, 32, 0.9);

    &::-webkit-scrollbar {
      width: 4px; /* Largura da barra de rolagem */
      height: 8px; /* Altura para scroll horizontal */
    }

    /* Fundo do scroll bar */
    &::-webkit-scrollbar-track {
      background: transparent; /* Cor do fundo */
      border-radius: 10px; /* Bordas arredondadas */
    }

    /* O controle que você pode rolar */
    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb-bg, transparent); /* Cor definida por variável CSS */
      border-radius: 10px; /* Bordas arredondadas */
      transition: background 0.3s ease; /* Transição suave */
    }

    /* Hover na barra */
    &::-webkit-scrollbar-thumb:hover {
      background: #555; /* Cor ao passar o mouse */
    }
    ${ChatMessageLine}:nth-child(1) {
      margin-top: 20px;
    }
    ${ChatNotMyMessage}, ${ChatMyMessage} {
      width: 100%;
      color: white;
      max-width: 400px;
      padding: 7px 15px 10px 15px;
      border-radius:  15px 5px 10px 5px;
      span {
        font-size: 14px;
      }
    }
    ${ChatMyMessage} {
      background-color: #005c4b;
    }
    ${ChatNotMyMessage} {
      background-color: #353535;
    }
  }
`
export const ChatFilterContainer = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  max-width: 300px;
  padding: 25px;
  flex-direction: column;
  background-color: #2c2c2c;
  border-right: 1px solid rgba(0,0,0,0.5);
  @media screen and (max-width: 676px) {
    max-width: 100%;
  }
`
export const SearchInput = styled.input``
export const SearchContainer = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  padding: 0px 10px;
  border-radius: 5px;
  align-items: center;
  transition: .3s linear;
  background-color: #383838;
  border-bottom: 2px solid white;
  &:hover {
    border-bottom: 2px solid #1daa61;
  }
  ${SearchInput} {
    width: 100%;
    height: 40px;
    border: none;
    color: white;
    transition: .3s linear;
    background-color: #383838;
    &:focus {
      &::placeholder {
        color: rgba(255, 255, 255, 0.5); /* 80% de opacidade */
      }
    }
  }
`
export const ChatContainer = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
`