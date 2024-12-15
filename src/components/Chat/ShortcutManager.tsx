import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';

// Define o tipo para atalhos
type ShortcutActions = {
  [shortcut: string]: () => void; // Atalho associado a uma ação
}
type ShortcutContextType = {
  registerShortcut: (shortcut: string, action: () => void) => void
  unregisterShortcut: (shortcut: string) => void
}
// Cria o contexto
const ShortcutContext = createContext<ShortcutContextType | undefined>(undefined)
// Provider para atalhos
export const ShortcutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shortcuts, setShortcuts] = useState<ShortcutActions>({})
  // Adiciona um atalho
  const registerShortcut = useCallback((shortcut: string, action: () => void) => {
    setShortcuts((prev) => ({ ...prev, [shortcut]: action }))
  }, [])
  // Remove um atalho
  const unregisterShortcut = useCallback((shortcut: string) => {
    setShortcuts((prev) => {
      const newShortcuts = { ...prev }
      delete newShortcuts[shortcut]
      return newShortcuts
    })
  }, [])
  // Handler global para atalhos
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keys = [
        event.ctrlKey ? 'Ctrl' : null,
        event.altKey ? 'Alt' : null,
        event.shiftKey ? 'Shift' : null,
        event.key
      ].filter(Boolean).join(' + ')

      if (shortcuts[keys]) {
        event.preventDefault() // Evita comportamentos padrões
        shortcuts[keys]() // Executa a ação associada
      }
    },
    [shortcuts]
  )
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  return (
    <ShortcutContext.Provider value={{ registerShortcut, unregisterShortcut }}>
      {children}
    </ShortcutContext.Provider>
  )
}
// Hook para acessar o contexto de atalhos
export const useShortcut = () => {
  const context = useContext(ShortcutContext)
  if (!context) {
    throw new Error('useShortcut deve ser usado dentro de um ShortcutProvider')
  }
  return context
}