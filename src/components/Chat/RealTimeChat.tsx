import { ChatCurrentPicture, ChatIconButton, ChatMessageLine, ChatMyMessage, ChatNotMyMessage, ChatRoomContainer, ChatRoomContent, ChatRoomHeader, ChatRoomHeaderProfile, ChatRoomInput, ChatRoomSearch, ChatRoomWithBackground, ChatSilverMessage, ChatWhiteContactName, ChatWhiteTitle, RoomWithoutCalls } from '../../styles/Chat'
import { FiSend } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setMessageText } from '../../store/slices/chatSlice'
import { useEffect, useState } from 'react'
import { TbMessageX } from 'react-icons/tb'

const RealTimeChat = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const selectedRoom = useSelector((state: RootState) => state.chat.selectedRoom)
  const selectedContact = useSelector((state: RootState) => state.chat.selectedContact)
  const isOnlineCurrentUser = useSelector((state: RootState) => state.chat.isOnlineCurrentUser)
  const [message, setMessage] = useState<string>('')
  const dispatch = useDispatch()
  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(setMessageText(message))
      setMessage('')
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }
  useEffect(() => {
    const chatRoomContent = document.querySelector(".chat-room-content") as HTMLElement;
    let scrollTimeout: number = 0; // Para detectar quando o scroll para
  
    if (chatRoomContent) {
      const handleScroll = () => {
        // Alterar a cor enquanto está rolando
        chatRoomContent.style.setProperty("--scrollbar-thumb-bg", "#444");
  
        // Reseta o timer para detectar quando o scroll parou
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Retornar à cor original após parar
          chatRoomContent.style.setProperty("--scrollbar-thumb-bg", "#888");
        }, 300); // 300ms após parar
      };
  
      // Adicionar evento de scroll
      chatRoomContent.addEventListener("scroll", handleScroll);
  
      return () => {
        // Remover evento ao desmontar
        chatRoomContent.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, []);
  return <ChatRoomContainer>
    <ChatRoomHeader>
      <ChatRoomHeaderProfile>
        <ChatCurrentPicture
          src={selectedContact?.profile_pic}
          backgroundColor={isOnlineCurrentUser ? 'green' : 'gray'}
        />
        <ChatWhiteContactName>{selectedContact?.name}</ChatWhiteContactName>
      </ChatRoomHeaderProfile>
      {/* <ChatRoomToolbar>
      
      </ChatRoomToolbar> */}
    </ChatRoomHeader>
    { selectedRoom?.id ? <ChatRoomWithBackground>
      <ChatRoomContent className='chat-room-content'>
        { selectedRoom?.messages.map(message => (<ChatMessageLine alignItems={message.sender_id === user.id ? 'flex-end' : 'flex-start'}>
          { message.sender_id === user.id ? <ChatMyMessage>
            <span>{message.text}</span>
          </ChatMyMessage> : <ChatNotMyMessage>
            <span>{message.text}</span>
          </ChatNotMyMessage> }
        </ChatMessageLine>)) }
      </ChatRoomContent>
    </ChatRoomWithBackground> : <ChatRoomWithBackground>
      <RoomWithoutCalls>
        <TbMessageX size={65} color={'#7e7e7e'} />
        <ChatWhiteTitle>Oops!</ChatWhiteTitle>
        <ChatSilverMessage>Você ainda não iniciou uma conversa com {selectedContact?.name}.</ChatSilverMessage>
      </RoomWithoutCalls>
    </ChatRoomWithBackground> }
    <ChatRoomSearch>
      <ChatRoomInput
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={'Mensagem'}
      />
      { message && <ChatIconButton onClick={handleSendMessage}>
        <FiSend size={18} />
      </ChatIconButton> }
    </ChatRoomSearch>
  </ChatRoomContainer>
}

export default RealTimeChat