export interface Likable {
  likes: number
}

export interface Author {
  username?: string
  first?: string
  last?: string
  profileImageUri?: string
}

export interface Comment extends Likable {
  body: string
  author: Author
}

export interface FeedItemData {
  title: string
  subTitle: string
  body: string
  imageUri: string
}

export interface FeedItem {
  id: string
  author: Author
  metadata: {
    publishDate: Date
    priority: number
  }
  data: FeedItemData
  comments: Comment[]
}
