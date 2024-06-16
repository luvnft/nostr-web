import { NDKEvent, NDKFilter, NDKKind } from '@nostr-dev-kit/ndk'
import { Media, Note } from '@/domain/entities/Note'
import {
  NoteRepository,
  SubscribeNotesOptions,
} from '@/domain/repositories/NoteRepository'
import { UserProfileRepository } from '@/domain/repositories/UserProfileRepository'
import { User } from '@/domain/entities/User'
import { NostrClient } from '@/infrastructure/nostr/nostrClient'
import { unixtimeOf } from '../nostr/utils'

const imageExtensions = ['jpg', 'png']

export class NoteService implements NoteRepository {
  #nostrClient: NostrClient
  #userProfileRepository: UserProfileRepository

  constructor(
    nostrClient: NostrClient,
    userProfileRepository: UserProfileRepository
  ) {
    this.#nostrClient = nostrClient
    this.#userProfileRepository = userProfileRepository
  }

  async postNote(note: Note): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async subscribeNotes(
    onNote: (note: Note) => void,
    options?: SubscribeNotesOptions
  ): Promise<void> {
    const user = await this.#nostrClient.getLoggedInUser()
    const follows = await user.follows()
    const authors =
      options?.authorPubkeys ??
      Array.from(follows.values()).map((a) => a.pubkey)

    const filterOptions: NDKFilter = {
      kinds: [NDKKind.Text],
      authors,
      since: options?.since ? unixtimeOf(options.since) : undefined,
      limit: options?.limit ?? 100,
      //or: [{ '#t': ['r'] }, { '#t': ['imeta'] }],
      //...(options?.image && { '#r': ['http.*'] }),
      // NIP-50: Search Capability - https://scrapbox.io/nostr/NIP-50
      // search文字列の仕様はRelayer依存
      // search: `https?.+\\.(${imageExtensions.join('|')})`,
    }

    await this.#nostrClient.subscribeEvents(
      filterOptions,
      async (event: NDKEvent) => {
        const profile = await this.#userProfileRepository.fetchProfile(
          event.author.npub
        )
        const author = new User({
          npub: event.author.npub,
          pubkey: event.author.pubkey,
          profile,
        })

        const note = await this.createNoteFromEvent(event, author)
        onNote(note)
      }
    )
  }

  async subscribeZaps(onZapEvent: (event: NDKEvent) => void): Promise<void> {
    throw new Error('Method not implemented.')
  }

  private async isImageUrl(url: string): Promise<boolean> {
    const cleanUrl = url.split('?')[0]
    const urlExtension = cleanUrl.split('.').pop()?.toLowerCase()
    const isExtensionImage =
      urlExtension && imageExtensions.includes(urlExtension)
    if (isExtensionImage) {
      return true
    }

    try {
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('Content-Type')
      return contentType ? contentType.startsWith('image') : false
    } catch (error) {
      console.error('Error fetching the URL:', error)
      return false
    }
  }

  private async extractMedia(event: NDKEvent) {
    /*
    for (const tag of event.tags) {
      if (tag.length > 1 && tag[0] === 'r') {
        const url = tag[1]
        if (await this.isImageUrl(url)) {
          media.push({ type: 'image', url })
        }
      } else if (tag.length > 1 && tag[0] === 'imeta') {
        for (const data of tag.slice(1)) {
          if (data.startsWith('url ')) {
            const url = data.split('url ')[1]
            media.push({ type: 'image', url })
          }
        }
      }
    }
*/
    const content = event.content
    const extensionsPattern = imageExtensions.join('|')
    const urlPattern = new RegExp(
      `http.*\\.(${extensionsPattern})(\\?[^\\s]*)?`
    )
    const matches = content.match(urlPattern) || []
    const media = matches.map((url) => ({ type: 'image', url }) as Media)
    /*
    if (content.match(/(https?.+\.mp3)/)) mediaTypes.add('audio')
    if (content.match(/(https?.+\.mp4)/)) mediaTypes.add('video')
    if (content.match(/https?:\/\/www.youtube.com\//)) mediaTypes.add('youtube')
    */

    return media
  }

  private async createNoteFromEvent(
    event: NDKEvent,
    author: User
  ): Promise<Note> {
    const media = await this.extractMedia(event)
    const json = JSON.stringify(event.rawEvent())
    return new Note({
      id: event.id,
      author,
      text: event.content,
      media,
      json,
      replies: 0,
      likes: 0,
      reposts: 0,
      zaps: 0,
      created_at: event.created_at
        ? new Date(event.created_at * 1000)
        : new Date('1970-01-01T00:00:00Z'),
    })
  }
}
