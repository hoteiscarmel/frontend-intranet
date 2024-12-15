import { ChatBetweenText, ChatNoMessageView, ChatFilterContainer, ChatItemBox, ChatLinkText, ChatSilverMessage, ChatWhiteContactName, ChatWhiteSubTitle, ChatAssetContent, ChatPrevImage } from '../../../styles/Chat'
import { CiImageOn } from 'react-icons/ci';
import { Favorites } from '../../../types/Chat'

const FavoritesFilter = () => {
  const favorites: Favorites [] = [
    { id: '', contact: { id: 'jadson', name: 'Jadson Morais' }, onDate: '13/12/2024', message: { type: 'image', content: 'https://forbes.com.br/wp-content/uploads/2024/05/avatar-forbes.webp', assetText: 'Olha só essa minha foto de perfil!' }}
  ]
  return <ChatFilterContainer>
    <ChatWhiteSubTitle>Mensagens Favoritas</ChatWhiteSubTitle>
    <ChatSilverMessage>Mensagens</ChatSilverMessage>
    <div>
      { favorites.map(favorite => <ChatItemBox key={favorite.id} className='favorite-item'>
        <ChatBetweenText>
          <ChatWhiteContactName>{ favorite.contact.name }</ChatWhiteContactName>
          <ChatSilverMessage>{ favorite.onDate }</ChatSilverMessage>
        </ChatBetweenText>
        { favorite.message.type === 'text' && <ChatLinkText>{ favorite.message.content }</ChatLinkText> }
        { favorite.message.type === 'image' && <ChatNoMessageView>
          { favorite.message.assetText ? <ChatSilverMessage className='asset-message'>
              <CiImageOn size={16} style={{ marginRight: 5 }} />
              { favorite.message.assetText }
            </ChatSilverMessage> :  <ChatSilverMessage className='asset-message'>
              <CiImageOn size={16} style={{ marginRight: 5 }} />
              Imagem enviada por {favorite.contact.name}
            </ChatSilverMessage> }
          <ChatAssetContent>
            <ChatPrevImage src={favorite.message.content} />
          </ChatAssetContent>
        </ChatNoMessageView> }
        { favorite.message.type === 'document' && <ChatNoMessageView>
          { favorite.message.assetText ? <ChatSilverMessage className='asset-message'>
              <CiImageOn size={16} style={{ marginRight: 5 }} />
              { favorite.message.assetText }
            </ChatSilverMessage> :  <ChatSilverMessage className='asset-message'>
              <CiImageOn size={16} style={{ marginRight: 5 }} />
              Imagem enviada por {favorite.contact.name}
            </ChatSilverMessage> }
          <ChatAssetContent>
            <ChatPrevImage src={favorite.message.content} />
          </ChatAssetContent>
        </ChatNoMessageView> }
      </ChatItemBox>) }
    </div>
  </ChatFilterContainer>
}

export default FavoritesFilter