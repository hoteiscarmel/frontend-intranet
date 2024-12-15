import { useDispatch, useSelector } from 'react-redux'
import { setSearched } from '../../store/slices/chatSlice'
import { SearchContainer, SearchInput } from '../../styles/Chat'
import { TbMessageSearch } from 'react-icons/tb'
import { RootState } from '../../store'

const Search = () => {
  const section = useSelector((state: RootState) => state.chat.filter.section)
  const dispatch = useDispatch()
  const renderMessage = () => {
    if (section === 'contacts') {
      return 'Pesquise um contato ou inicie uma conversa!'
    }
    if (section === 'rooms') {
      return 'Procure por uma mensagem ou inicie uma conversa com outro contato!'
    }
    if (section === 'archiveds') {
      return 'Procure por conversas que você arquivou!'
    }
    if (section === 'favorites') {
      return 'Procure por suas mensagens favoritas!'
    }
    if (section === 'calls') {
      return 'Procure por contatos ou ligações que já foram realizadas!'
    }
    return 'Não há o que procurar por aqui'
  }
  return <SearchContainer>
    <TbMessageSearch color='white' />
    <SearchInput
      onChange={(e) => dispatch(setSearched(e.target.value))}
      placeholder={renderMessage()}
    />
  </SearchContainer>
}

export default Search