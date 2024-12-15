
import { CloseSidebar, OpenSidebar, SidebarControls, SidebarGroups, SidebarItem, SidebarItemsGroups, SidebarLayout, SidebarLogoutButton, SidebarLogoWithControls, SidebarUiTitle } from "../styles/Sidebar"
import { useEffect, useRef, useState } from "react"
import { FaEllipsis } from "react-icons/fa6"
import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi"
import { MdMarkUnreadChatAlt } from "react-icons/md"
// import { MdOutlineMarkUnreadChatAlt } from "react-icons/md"
import { Tooltip } from "antd"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "../store/slices/authSlice"
import { setInitialChat } from "../store/slices/chatSlice"

const sidebarConfig = [
  {
    group: "Intranet",
    items: [
      {
        path: "/chat",
        icon: <MdMarkUnreadChatAlt />,
        label: "Chat",
      },
    ],
  },
]

const Sidebar: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onDispatchLogout = () => {
    dispatch(logout())
    dispatch(setInitialChat())
    navigate('/')
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <SidebarLayout ref={sidebarRef} className={isOpen ? "open" : "closed"} onBlur={() => setIsOpen(false)}>
      <SidebarLogoWithControls>
        <SidebarControls>
          {!isOpen ? (
            <OpenSidebar onClick={() => setIsOpen(true)}><FiChevronRight /></OpenSidebar>
          ) : (
            <CloseSidebar onClick={() => setIsOpen(false)}><FiChevronLeft /></CloseSidebar>
          )}
        </SidebarControls>
      </SidebarLogoWithControls>
      <SidebarItemsGroups>
        {sidebarConfig.map((group, index) => (
          <SidebarGroups
            key={index}
            className={isOpen ? "aligned-start" : "centered"}
          >
            {isOpen ? (
              <SidebarUiTitle>{group.group}</SidebarUiTitle>
            ) : (
              <Tooltip color={"cyan"} placement={"right"} title={group.group}>
                <FaEllipsis color="white" />
              </Tooltip>
            )}
            {group.items.map((item, idx) => {
              const isActive = location.pathname === item.path
              return (
                <Tooltip
                  key={idx}
                  color={"cyan"}
                  placement={"right"}
                  title={!isOpen ? item.label : ""}
                >
                  <SidebarItem
                    className={`${isOpen ? "wide" : "narrow"} ${
                      isActive ? "active" : ""
                    }`}
                    style={{
                      background: isActive ? "#27272a" : "transparent",
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.icon}
                    {isOpen && <>{item.label}</>}
                  </SidebarItem>
                </Tooltip>
              )
            })}
          </SidebarGroups>
        ))}
      </SidebarItemsGroups>
      <SidebarLogoutButton onClick={() => onDispatchLogout()} className={isOpen ? "wide" : "narrow"}>
        <FiLogOut />
        {isOpen && <>Sair</>}
      </SidebarLogoutButton>
    </SidebarLayout>
  )
}

export default Sidebar