
export interface Favorites {
  id: string
  contact: {
    id: string
    name: string
  }
  onDate: string
  message: {
    type: 'text' | 'image' | 'video' | 'audio' | 'document'
    content: string
    assetText?: string
  }
}