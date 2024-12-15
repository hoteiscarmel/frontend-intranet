import { useDispatch, useSelector } from "react-redux"
import { ChatContactLabels, ChatContactPicture, ChatFilterContainer, ChatItemBox, ChatScrolled, ChatSilverMessage, ChatWhiteContactName, ChatWhiteSubTitle } from "../../../styles/Chat"
import Search from "../Search"
import { RootState } from "../../../store"
import { useMemo } from "react"
import { UserState } from "../../../store/slices/authSlice"
import { Room, setIsOnlineCurrentUser, setIsOpenRoom, setSelectedContact } from "../../../store/slices/chatSlice"

const ArchivedsFilter = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const rooms = useSelector((state: RootState) => state.chat.rooms)
  const searched = useSelector((state: RootState) => state.chat.filter.searched)
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers)
  const dispatch = useDispatch()
  const isOnlineUser = (selectedContact: UserState) => {
    const userObject = typeof selectedContact === 'object' ? selectedContact : JSON.parse(selectedContact)
    return onlineUsers.some(contact => contact.id === userObject?.id)
  }
  const foundedContact = (roomContacts: UserState []) => {
    const roomContactsObjects = roomContacts.map(contact =>
      typeof contact === 'object' ? contact : JSON.parse(contact)
    )
    return roomContactsObjects[0].id === user.id ? roomContactsObjects[1] : roomContactsObjects[0]
  }
  const onGetRoom = (room: Room) => {
    if (isOnlineUser(foundedContact(room.allContacts))) {
      dispatch(setIsOnlineCurrentUser(true))
    } else {
      dispatch(setIsOnlineCurrentUser(false))
    }
    dispatch(setSelectedContact(foundedContact(room.allContacts)))
    dispatch(setIsOpenRoom(true))
  }
  const filteredArchivedRooms = useMemo(() => {
    if (!searched) return []
    const archivedRooms = rooms.filter(room => room.archived_by.includes(user.id))
    return archivedRooms.filter((room) =>
      room?.messages.some((message) => message.text.includes(searched))
    )
  }, [rooms, searched])
  const renderMessage = () => {
    if (!searched && filteredArchivedRooms.length === 0) {
      return 'Não há nenhuma conversa arquivada!'
    }
    if (searched && filteredArchivedRooms.length === 0) {
      return 'Você não tem conversas arquivadas com valor informado!'
    }
    if (!searched) {
      return 'Todos as Conversas Arquivadas'
    }
    return 'Conversas Arquivadas'
  }
  return <ChatFilterContainer>
    <ChatWhiteSubTitle>Arquivadas</ChatWhiteSubTitle>
    <Search />
    <ChatSilverMessage>{renderMessage()}</ChatSilverMessage>
    <ChatScrolled>
      { filteredArchivedRooms.map(room => (<ChatItemBox key={room.id} className='contact-item' onClick={() => onGetRoom(room)}>
        <ChatContactPicture
          src={foundedContact(room.allContacts).profile_pic}
          backgroundColor={isOnlineUser(
            foundedContact(room.allContacts)
          ) ? 'green' : 'gray'}
        />
        { room?.messages[room?.messages?.length -1]?.text && <ChatContactLabels>
          <ChatWhiteContactName>{ foundedContact(room.allContacts).name }</ChatWhiteContactName>
          <ChatSilverMessage>{ room.messages[room.messages.length -1].text }</ChatSilverMessage>
        </ChatContactLabels> }
      </ChatItemBox>)) }
    </ChatScrolled>
  </ChatFilterContainer>
}

export default ArchivedsFilter