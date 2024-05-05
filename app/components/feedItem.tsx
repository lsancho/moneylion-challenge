'use client'

import React from 'react'
import Image from 'next/image'
import { Comment as TComment, FeedItem as TFeedItem } from '@/types'
import { EyeIcon, EyeOffIcon, HeartIcon, MessageSquare, WholeWord } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

interface FeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TFeedItem
}

const fmt = Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
export function FeedItem({ data, className, ...props }: FeedItemProps) {
  const pubDate = fmt.format(data.metadata.publishDate)
  const charCount = data.data.body.length

  const [isContentOpened, setContentOpen] = React.useState(false)

  return (
    <div data-feed-id={data.id} className='bg-background relative overflow-hidden rounded-lg border p-2'>
      <div className='flex max-h-max flex-col justify-between rounded-md p-6'>
        <div className={cn('justify-center gap-4 space-y-3 md:grid md:grid-cols-5 ', className)} {...props}>
          <div className='col-span-1 flex overflow-hidden rounded-md'>
            <Image
              src={data.data.imageUri}
              alt={data.data.title}
              width={100}
              height={100}
              className={cn('h-[150px] w-[200px] flex-auto object-cover')}
            />
          </div>
          <Collapsible className='col-span-4 space-y-1 text-sm' open={isContentOpened} onOpenChange={setContentOpen}>
            <CollapsibleTrigger className='cursor-pointer  hover:text-slate-500' asChild>
              <h1>
                <span className='font-bold leading-none'>{data.data.title}</span>
                {data.data.subTitle && <span className='text-sm font-medium leading-tight'> - {data.data.subTitle}</span>}
              </h1>
            </CollapsibleTrigger>
            <h2 className='text-muted-foreground text-xs'>
              <span className='font-light'>{pubDate} by </span>
              <span>{`${data.author.first + ' ' + data.author.last}`}</span>
            </h2>
            <CollapsibleTrigger className='cursor-pointer' asChild>
              <div className='flex space-x-2 p-1'>
                {!isContentOpened && <EyeIcon className='mr-2 size-5  hover:text-slate-300' />}
                {isContentOpened && <EyeOffIcon className='mr-2 size-5  hover:text-slate-300' />}
              </div>
            </CollapsibleTrigger>
            <Separator className='my-8' />
            <CollapsibleContent className='space-y-2'>
              <p className='mt-2'>{data.data.body}</p>
            </CollapsibleContent>
            <div className='flex flex-col p-1 text-sm font-light md:flex-row'>
              {!isContentOpened && (
                <div className='flex space-x-2 p-1 md:hidden'>
                  <WholeWord className='mr-2 size-5' />
                  {charCount} characters
                </div>
              )}
              <FeedItemComments className='col-span-3 flex space-x-2 p-1' id={data.id} data={data.comments} />
            </div>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

interface FeedItemCommentsProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  data: TComment[]
}

const FeedItemComments = ({ id, data, className }: FeedItemCommentsProps) => {
  const formatNumber = (number: number): string => {
    if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + 'M'
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + 'K'
    } else {
      return number.toString()
    }
  }

  const commentCount = data.length

  const [isOpen, setOpen] = React.useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen}>
      <CollapsibleTrigger className='cursor-pointer' asChild>
        <div className={cn('', className)}>
          <MessageSquare className='mr-2 size-5 hover:text-slate-300' />
          {commentCount} comments
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-1 space-y-2'>
        {data.map((comment, idx) => (
          <div key={`${id}-${idx}}`} className='flex flex-row p-1 text-xs font-light'>
            <span className='font-medium'>{comment.author.username}:</span>
            <span className='ml-1 break-words'>{comment.body}</span>
            <span className='text-xxs ml-5 flex leading-3'>
              <HeartIcon className='mr-1 size-3 hover:text-red-600' />
              {formatNumber(comment.likes)}
            </span>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
