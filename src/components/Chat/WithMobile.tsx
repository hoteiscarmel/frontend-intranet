import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { RoomMobile } from '../../styles/Chat'

export function WithMobile<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const isMobileRoom = useSelector((state: RootState) => state.chat.isMobileRoom)
    const isOpenRoom = useSelector((state: RootState) => state.chat.isOpenRoom)
    if (isMobileRoom && isOpenRoom) {
      return <RoomMobile isMobileRoom={true}>
        <WrappedComponent {...props} />
      </RoomMobile>
    }
    if (isMobileRoom && !isOpenRoom) {
      return null
    }
    return <WrappedComponent {...props} />
  }
}