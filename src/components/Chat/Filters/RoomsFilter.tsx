import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect, useMemo } from "react"
import { ChatContactLabels, ChatContactPicture, ChatFilterContainer, ChatItemBox, ChatScrolled, ChatSilverMessage, ChatWhiteContactName, ChatWhiteSubTitle } from "../../../styles/Chat"
import Search from "../Search"
import { Room, setIsOnlineCurrentUser, setIsOpenRoom, setRoomSelected, setSelectedContact } from "../../../store/slices/chatSlice"
import { UserState } from "../../../store/slices/authSlice"

const RoomsFilter = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const rooms = useSelector((state: RootState) => state.chat.rooms)
  const searched = useSelector((state: RootState) => state.chat.filter.searched)
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers)
  const selectedContact = useSelector((state: RootState) => state.chat.selectedContact)
  const dispatch = useDispatch()
  const isOnlineUser = (selectedContact: UserState) => {
    const userObject = typeof selectedContact === 'object' ? selectedContact : JSON.parse(selectedContact)
    return onlineUsers.some(contact => contact.id === userObject?.id)
  }
  const onGetContactRoom = () => {
    const currentRoom = rooms.find(room => 
      (room.receive_id === user.id && room.sender_id === selectedContact.id) ||
      (room.sender_id === user.id && room.receive_id === selectedContact.id)
    )
    if (currentRoom) {
      dispatch(setRoomSelected(currentRoom))
    }
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
  const foundedContact = (roomContacts: UserState []) => {
    const roomContactsObjects = roomContacts.map(contact =>
      typeof contact === 'object' ? contact : JSON.parse(contact)
    )
    console.log(roomContactsObjects[0].name, roomContactsObjects[1].name)
    return roomContactsObjects[0].id === user.id ? roomContactsObjects[1] : roomContactsObjects[0]
  }
  const filteredRooms = useMemo(() => {
    if (!searched) return rooms
    return rooms.filter((room) =>
      room?.messages.some((message) => message.text.includes(searched))
    )
  }, [rooms, searched])
  const renderMessage = () => {
    if (!searched && filteredRooms.length === 0) {
      return 'Não há nenhuma conversa cadastrada no sistema!'
    }
    if (searched && filteredRooms.length === 0) {
      return 'Não foram encontrado conversas com o filtro realizado!'
    }
    if (!searched) {
      return 'Todos as Conversas'
    }
    return 'Conversas Encontradas'
  }
  useEffect(() => {
    onGetContactRoom()
  }, [selectedContact])
  return <ChatFilterContainer>
    <ChatWhiteSubTitle>Conversas</ChatWhiteSubTitle>
    <Search />
    <ChatSilverMessage>{renderMessage()}</ChatSilverMessage>
    <ChatScrolled>
      { filteredRooms.map(room => (<ChatItemBox key={room.id} className='contact-item' onClick={() => onGetRoom(room)}>
        <ChatContactPicture
          src={foundedContact(room.allContacts).profile_pic}
          backgroundColor={isOnlineUser(
            foundedContact(room.allContacts)
          ) ? 'green' : 'gray'}
        />
        <ChatContactLabels>
          <ChatWhiteContactName>{ foundedContact(room.allContacts).name }</ChatWhiteContactName>
          <ChatSilverMessage>{ foundedContact(room.allContacts).message }</ChatSilverMessage>
        </ChatContactLabels>
      </ChatItemBox>)) }
    </ChatScrolled>
  </ChatFilterContainer>
}

export default RoomsFilter