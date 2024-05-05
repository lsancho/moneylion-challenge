import { getFeed } from '@/lib/data'
import { FeedItem } from '@/components/feedItem'

export default async function IndexPage() {
  const feed = await getFeed()

  return (
    <>
      <section id='feed' className='container space-y-6 bg-slate-50 py-4 md:py-6 lg:py-8 dark:bg-transparent'>
        <div className='mx-auto grid justify-center gap-4 sm:grid-cols-1 md:max-w-5xl'>
          {feed.map((item) => (
            <FeedItem key={item.id} data={item} />
          ))}
        </div>
      </section>
    </>
  )
}
