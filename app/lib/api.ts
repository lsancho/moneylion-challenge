import { FeedItem } from '@/types'

export const getFeed = async () => {
  const url = process.env.API_BASE_URL + '/content'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Prefer: 'code=200',
      Accept: 'application/json'
    }
  })
  const data = (await response.json()) as API.ResponseData
  const items = data.contentCards.map(mapToFeedItem).sort((a, b) => b.metadata.priority - a.metadata.priority)
  return items
}

const mapToFeedItem = (item: API.Content): FeedItem => {
  return {
    id: item.id,
    metadata: {
      publishDate: new Date(item.metadata.publishDate),
      priority: item.metadata.priority
    },
    data: {
      title: item.textData.title,
      subTitle: item.textData.subTitle,
      body: item.textData.body,
      imageUri: item.imageUri
    },
    comments: item.comments.map((c) => ({
      likes: c.likes,
      body: c.text,
      author: {
        username: c.author,
        profileImageUri: c.profilePic
      }
    })),
    author: {
      first: item.textData.author.first,
      last: item.textData.author.last
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace API {
  export interface ResponseData {
    contentCards: Content[]
  }
  export interface Content {
    id: string
    imageUri: string
    metadata: Metadata
    comments: Comment[]
    textData: TextData
  }

  export interface Comment {
    likes: number
    author: string
    text: string
    profilePic: string
  }

  export interface Metadata {
    priority: number
    publishDate: Date
  }

  export interface TextData {
    title: string
    author: Author
    body: string
    subTitle: string
  }

  export interface Author {
    first: string
    last: string
  }
}
