import { useDispatch, useSelector } from 'react-redux'
import FavoritesFilter from '../components/Chat/Filters/FavoritesFilter'
import WellcomeChat from '../components/Chat/WellcomeChat'
import { useShortcut } from '../components/Chat/ShortcutManager'
import { ChatContainer } from '../styles/Chat'
import { initialRoomState, Room, setContacts, setIsMobileRoom, setIsOnlineCurrentUser, setIsOpenRoom, setMessageText, setOnlineUsers, setRooms, setRoomSelected, setSectionFilter, setSelectedContact } from '../store/slices/chatSlice'
import { useEffect, useRef } from 'react'
import { RootState } from '../store'
import RoomsFilter from '../components/Chat/Filters/RoomsFilter'
import ContactsFilter from '../components/Chat/Filters/ContactsFilter'
import CallsFilter from '../components/Chat/Filters/CallsFilter'
import ArchivedsFilter from '../components/Chat/Filters/ArchivedsFilter'
import { initialUserState, UserState } from '../store/slices/authSlice'
import { errorMessage } from '../store/slices/errorSlice'
import { message } from 'antd'
import { api, baseURL } from '../services/api'
import RealTimeChat from '../components/Chat/RealTimeChat'
import io from 'socket.io-client'
import { WithAuth } from './WithAuth'
import DesktopSidebar from '../components/Chat/DesktopSidebar'

const Chat = () => {
  const user = useSelector((state: RootState) => state.auth)
  const rooms = useSelector((state: RootState) => state.chat.rooms)
  const isMobileRoom = useSelector((state: RootState) => state.chat.isMobileRoom)
  const filterSection = useSelector((state: RootState) => state.chat.filter.section)
  const selectedContact = useSelector((state: RootState) => state.chat.selectedContact)
  const selectedRoom = useSelector((state: RootState) => state.chat.selectedRoom)
  const wasSendText = useSelector((state: RootState) => state.chat.wasMessage.wasSendText)
  const { registerShortcut, unregisterShortcut } = useShortcut()
  const dispatch = useDispatch()
  const socketRef = useRef<any>(null)
  const fetchContacts = async (userJWT: string, userId: string) => {
    try {
      const request = await api.get('/api/contacts', { headers: { authorization: userJWT } })
      const contacts: UserState[] = request.data
      const onlyOtherUsers = contacts.filter(contact => contact.id !== userId)
      const typeOfUsers = onlyOtherUsers
        .map(otherUser => (typeof otherUser === 'object' ? otherUser : JSON.parse(otherUser)))
      const uniqueUsers = typeOfUsers.filter((user, index, self) =>
        index === self.findIndex(u => u.id === user.id)
      )
      dispatch(setContacts(uniqueUsers))
    } catch (error: any) {
      const errorText = error.response.data.message || error.response.data.error || 'Não foi possível carregar os contatos!'
      dispatch(errorMessage(errorText))
      setTimeout(() => {
        message.error(errorText)
      }, 1500)
    }
  }
  const foundMyRooms = (myRooms: Room []) => {
    return myRooms.filter(room => {
      // Parse da string allContacts para um objeto, caso necessário
      const allContacts: UserState [] = room.allContacts.map(contact => 
        typeof contact  === 'object'
        ? contact
        : JSON.parse(contact)
      )
      // Verificar se algum contato tem o ID do usuário
      return allContacts.some(contact => contact.id === user.user.id)
    })
  }
  const fetchRooms = async () => {
    try {
      const request = await api.get('/api/rooms', { headers: { authorization: user.userJWT } })
      const roomsData: Room [] = request.data
      const myRooms = foundMyRooms(roomsData)
      dispatch(setRooms(myRooms))
      const currentRoom = roomsData.find(room => 
        (room.receive_id === user.user.id && room.sender_id === selectedContact.id) ||
        (room.sender_id === user.user.id && room.receive_id === selectedContact.id)
      )
      if (currentRoom?.id) {
        dispatch(setRoomSelected(currentRoom))
      }
      if (roomsData.length >= 1 && rooms.length < 1) {
        dispatch(setSectionFilter('rooms'))
      }
    } catch (error: any) {
      const errorText = error.response.data.message || error.response.data.error || 'Não foi possível carregar as conversas!'
      dispatch(errorMessage(errorText))
      dispatch(setRooms([]))
      setTimeout(() => {
        message.error(errorText)
      }, 1500)
    }
  }
  useEffect(() => {
    const handleResize = () => {
      // Verifica a largura da tela
      const isMobile = window.innerWidth < 676
      dispatch(setIsMobileRoom(isMobile))
    }
    // Chama a função no carregamento inicial
    handleResize()
    // Adiciona o listener para mudanças no tamanho da tela
    window.addEventListener('resize', handleResize)
    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])
  useEffect(() => {
    // Fechar Conversa
    registerShortcut('Shift + F4', () => {
      dispatch(setIsOpenRoom(false))
      dispatch(setRoomSelected(initialRoomState))
      dispatch(setSelectedContact(initialUserState))
    })
    return () => {
      // Remove atalhos ao desmontar
      unregisterShortcut('Shift + F4');
    };
  }, [registerShortcut, unregisterShortcut])
  useEffect(() => {
    Promise.all([
      fetchRooms(),
      fetchContacts(user.userJWT, user.user.id)
    ])
  }, [])
  useEffect(() => {
    // Conecta ao socket
    socketRef.current = io(baseURL, {
      auth: {
        token: user.userJWT,
      },
    })
    // Listener para usuários online
    socketRef.current.on('online_users' , (users: UserState []) => {
      const isOnline = users.some(user => user.id === selectedContact?.id)
      dispatch(setOnlineUsers(users))
      dispatch(setIsOnlineCurrentUser(isOnline))
      fetchContacts(user.userJWT, user.user.id)
    })
    // Listener para mensagens recebidas
    socketRef.current.on('receive_message', () => {
      fetchRooms()
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [user.userJWT])
  useEffect(() => {
    if (wasSendText) {
      const messageData = {
        text: wasSendText,
        is_group: false,
        sender_id: user.user.id,
        image_url: '',
        video_url: ''
      }
      if (selectedRoom?.id) {
        socketRef.current.emit('send_message', { currentRoom: selectedRoom, messageData })
        dispatch(setMessageText(''))
      } else {
        socketRef.current.emit('send_message', { currentRoom: {
          id: '',
          sender_id: user.user.id,
          receive_id: selectedContact.id,
          allContacts: [user.user, selectedContact],
          archived_by: [],
          messages: []
        }, messageData })
        dispatch(setMessageText(''))
      }
      fetchRooms()
    }
  }, [wasSendText])
  return <ChatContainer>
    { !isMobileRoom && <DesktopSidebar /> }
    { filterSection === 'contacts' && <ContactsFilter /> }
    { filterSection === 'rooms' && <RoomsFilter /> }
    { filterSection === 'archiveds' && <ArchivedsFilter /> }
    { filterSection === 'favorites' && <FavoritesFilter /> }
    { filterSection === 'calls' && <CallsFilter /> }
    { !selectedContact?.id && <WellcomeChat /> }
    { selectedContact?.id && <RealTimeChat /> }
  </ChatContainer>
}

export default WithAuth(Chat)