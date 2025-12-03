import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import { faker } from '@faker-js/faker'

const fakeReviews = Array.from({ length: 30 }).map(() => ({
  img: faker.image.personPortrait(),
  name: faker.person.fullName(),
  username: faker.person.jobType(),
  title: faker.person.jobType(),
  body: faker.food.description()
}))

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => {
  return (
    <figure
      className={cn(
        'relative h-full w-full cursor-pointer overflow-hidden rounded-xl border p-6',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
        // cyber styles
        'cyber:border-gray-50/[.1] cyber:bg-gray-50/[.10] cyber:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-row items-center gap-2'>
        <img className='rounded-full' width='32' height='32' alt='' src={img} />
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium text-foreground'>{name}</figcaption>
          <p className='text-xs font-medium dark:text-white/40'>{username}</p>
        </div>
      </div>
      <blockquote className='mt-2 text-sm'>{body}</blockquote>
    </figure>
  )
}

export function MarqueeVertical() {
  return (
    <div className='relative z-20 py-10 md:py-40'>
      <div className='px-4'>
        <h2 className='font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight text-center'>
          Loved by people all over the universe
        </h2>
        <h2 className='text-sm md:text-base my-4 text-muted-foreground font-normal dark:text-muted-dark text-center max-w-lg mx-auto'>
          Every AI is used by millions of people around the globe. Our APIs have fan bases and people fight for us over
          twitter.
        </h2>
      </div>
      <div className='relative max-w-7xl mx-auto mt-16 sm:mt-20 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-6 lg:gap-8 overflow-hidden px-4 sm:grid-cols-2 lg:grid-cols-3'>
        <Marquee vertical className='[--duration:14s]'>
          {fakeReviews.slice(0, 10).map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className='hidden sm:block'>
          <Marquee vertical className='[--duration:16s]'>
            {fakeReviews.slice(11, 20).map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
        <div className='hidden lg:block'>
          <Marquee vertical className='[--duration:14s]'>
            {fakeReviews.slice(21, 30).map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
        <div className='from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b'></div>
        <div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t'></div>
      </div>
    </div>
  )
}
