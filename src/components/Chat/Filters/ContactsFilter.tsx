import { ChatContactLabels, ChatContactPicture, ChatFilterContainer, ChatItemBox, ChatScrolled, ChatSilverMessage, ChatWhiteContactName, ChatWhiteSubTitle, } from '../../../styles/Chat'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useEffect, useMemo } from 'react'
import { initialRoomState, setIsOnlineCurrentUser, setIsOpenRoom, setRoomSelected, setSelectedContact } from '../../../store/slices/chatSlice'
import Search from '../Search'
import { UserState } from '../../../store/slices/authSlice'

const ContactsFilter = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const rooms = useSelector((state: RootState) => state.chat.rooms)
  const selectedContact = useSelector((state: RootState) => state.chat.selectedContact)
  const searched = useSelector((state: RootState) => state.chat.filter.searched)
  const contacts = useSelector((state: RootState) => state.chat.contacts)
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers)
  const dispatch = useDispatch()
  const isOnlineUser = (selectedContact: UserState) => {
    return onlineUsers.some(contact => contact.id === selectedContact?.id)
  }
  const onGetContactRoom = () => {
    const currentRoom = rooms.find(room => 
      (room.receive_id === user.id && room.sender_id === selectedContact.id) ||
      (room.sender_id === user.id && room.receive_id === selectedContact.id)
    )
    if (currentRoom) {
      dispatch(setRoomSelected(currentRoom))
    } else {
      dispatch(setRoomSelected(initialRoomState))
    }
  }
  const onGetContact = (contact: UserState) => {
    if (isOnlineUser(contact)) {
      dispatch(setIsOnlineCurrentUser(true))
    } else {
      dispatch(setIsOnlineCurrentUser(false))
    }
    dispatch(setSelectedContact(contact))
    dispatch(setIsOpenRoom(true))
    onGetContactRoom()
  }
  const filteredContacts = useMemo(() => {
    if (!searched) return contacts
    return contacts.filter(
      (contact) =>
        contact?.name?.includes(searched) ||
        contact?.message?.includes(searched) ||
        contact?.mail?.includes(searched)
    )
  }, [contacts, searched])
  const renderMessage = () => {
    if (!searched && filteredContacts.length === 0) {
      return 'Não há nenhum contato cadastrado no sistema!'
    }
    if (searched && filteredContacts.length === 0) {
      return 'Você não tem contatos com o nome informado!'
    }
    if (!searched) {
      return 'Todos os Contatos'
    }
    return 'Contatos Encontrados'
  }
  useEffect(() => {
    onGetContactRoom()
  }, [selectedContact])
  return <ChatFilterContainer>
    <ChatWhiteSubTitle>Contatos</ChatWhiteSubTitle>
    <Search />
    <ChatSilverMessage>{renderMessage()}</ChatSilverMessage>
    <ChatScrolled>
      { filteredContacts.map(contact => (<ChatItemBox key={contact.id} className='contact-item' onClick={() => onGetContact(contact)}>
        <ChatContactPicture
          src={contact.profile_pic}
          backgroundColor={isOnlineUser(contact) ? 'green' : 'gray'}
        />
        <ChatContactLabels>
          <ChatWhiteContactName>{ contact.name }</ChatWhiteContactName>
          <ChatSilverMessage>{ contact.message }</ChatSilverMessage>
        </ChatContactLabels>
      </ChatItemBox>)) }
    </ChatScrolled>
  </ChatFilterContainer>
}

export default ContactsFilter
