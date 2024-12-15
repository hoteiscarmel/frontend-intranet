import { TbBrandWhatsapp } from 'react-icons/tb'
import { ChatSilverMessage, ChatWhiteTitle, RoomWithoutCalls } from '../../styles/Chat'

const WellcomeChat = () => {
  return <RoomWithoutCalls>
    <TbBrandWhatsapp size={65} color={'#7e7e7e'} />
    <ChatWhiteTitle>WhatsApp Intranet</ChatWhiteTitle>
    <ChatSilverMessage>Selecione um dos seus contatos para iniciar uma nova conversa ou retorne uma conversa anterior.</ChatSilverMessage>
  </RoomWithoutCalls>
}

export default WellcomeChat