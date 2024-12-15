import { ChatSidebarContainer, ToolGroup, ToolIcon } from "../../styles/Chat"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setInitialChat, setSectionFilter } from "../../store/slices/chatSlice"
import { AiOutlineMessage, AiOutlineUser } from "react-icons/ai"
// import { HiOutlinePhone } from "react-icons/hi"
import { BsArchive } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import { logout } from "../../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

const DesktopSidebar = () => {
  const rooms = useSelector((state: RootState) => state.chat.rooms)
  const [selected, setSelected] = useState('Conversas')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sidebarConfig = [
    {
      group: "Features",
      items: [
        {
          icon: <AiOutlineMessage size={20} color={'#ffffff'} />,
          label: "Conversas",
          showFilter: () => {
            dispatch(setSectionFilter('rooms'))
          }
        },
        {
          icon: <AiOutlineUser size={20} color={'#ffffff'} />,
          label: "Contatos",
          showFilter: () => {
            dispatch(setSectionFilter('contacts'))
          }
        },
        // {
        //   icon: <AiOutlineStar size={20} color={'#ffffff'} />,
        //   label: "Favoritos",
        //   showFilter: () => {
        //     dispatch(setSectionFilter('favorites'))
        //   }
        // },
        {
          icon: <BsArchive size={20} color={'#ffffff'} />,
          label: "Arquivadas",
          showFilter: () => {
            dispatch(setSectionFilter('archiveds'))
          }
        },
        // {
        //   icon: <HiOutlinePhone size={20} color={'#ffffff'} />,
        //   label: "Ligações",
        //   showFilter: () => {
        //     dispatch(setSectionFilter('calls'))
        //   }
        // },
      ],
    },
  ]
  const onDispatchLogout = () => {
    dispatch(logout())
    dispatch(setInitialChat())
    navigate('/')
  }
  useEffect(() => {
    setSelected(rooms.length >= 1 ? 'Conversas' : 'Contatos')
  }, [rooms])
  return <ChatSidebarContainer>
    { sidebarConfig.map((item, index) => (<ToolGroup key={index}>
      { item.items.map(tool => (<ToolIcon
        backgroundColor={selected === tool.label
          ? 'rgba(255, 255, 255, 0.1)'
          : 'transparent'}
        key={tool.label}
        onClick={() => { setSelected(tool.label), tool.showFilter() }}
      >
        { tool.icon }
      </ToolIcon>)) }
    </ToolGroup>))}
    <ToolIcon backgroundColor={'transparent'}  onClick={onDispatchLogout}>
      <FiLogOut color='white' />
      <span style={{ color: 'white' }}>Sair</span>
    </ToolIcon>
  </ChatSidebarContainer>
}

export default DesktopSidebar