import Chat from "./pages/Chat";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { ShortcutProvider } from './components/Chat/ShortcutManager'
import { PageLayout, RootLayoutContainer } from './styles/Root'
// import Sidebar from './components/Sidebar';
import Login from "./pages/Login";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const location = useLocation()
  // const showSidebar = location.pathname !== '/'
  return  (<RootLayoutContainer>
    {/* {showSidebar && <Sidebar />} */}
    <PageLayout>
      <main>{children}</main>
    </PageLayout>
  </RootLayoutContainer>)
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/chat" element={<ShortcutProvider>
                <Chat />
              </ShortcutProvider>} />
            </Routes>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App