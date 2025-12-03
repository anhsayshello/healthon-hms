import CardSwap, { Card } from '@/components/features/react-bits/CardSwap'
import { Safari } from '@/components/ui/safari'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { PointerHighlight } from '@/components/ui/pointer-highlight'
import { motion } from 'motion/react'

export default function FeatureSection() {
  return (
    <div>
      <BentoGridDemo />
      <FeatureStackDemo />
    </div>
  )
}

function FeatureStackDemo() {
  return (
    <div className='relative min-h-[30rem] overflow-hidden border-b px-6 sm:px-8 py-20 md:min-h-[55rem] md:py-40 lg:min-h-[55rem] xl:min-h-[40rem]'>
      <div className='relative max-w-7xl mx-auto'>
        <div className='xl:w-[60%]'>
          <div className='font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mt-4 text-left leading-tight'>
            Card stacks have never looked so good
          </div>
          <h2 className='text-sm md:text-base mt-4 text-muted-foreground font-normal dark:text-muted-dark max-w-lg'>
            Upload your RFP and Rogue will shred it to give you a full compliance matrix.
          </h2>
        </div>
      </div>
      <div>
        <CardSwap delay={3500}>
          <Card>
            <Safari url='card' />
          </Card>
          <Card>
            <Safari url='card' />
          </Card>
          <Card>
            <Safari url='card' />
          </Card>
        </CardSwap>
      </div>
    </div>
  )
}

export function BentoGridDemo() {
  return (
    <div className='relative py-12 sm:py-20'>
      <motion.div
        className='px-4'
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className='font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight text-center mx-auto'>
          Loved by people all over the
          <PointerHighlight containerClassName='inline-block ml-2'>
            <span>universe</span>
          </PointerHighlight>
        </h2>
        <h2 className='text-sm md:text-base my-4 text-muted-foreground font-normal dark:text-muted-dark text-center max-w-lg mx-auto'>
          Every AI is used by millions of people around the globe. Our APIs have fan bases and people fight for us over
          twitter.
        </h2>
      </motion.div>
      <BentoGrid className='mt-12 max-w-7xl mx-auto px-4'>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
          />
        ))}
      </BentoGrid>
    </div>
  )
}
const Skeleton = () => <div className='flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br'></div>
const items = [
  {
    title: 'The Dawn of Innovation',
    description: 'Explore the birth of groundbreaking ideas and inventions.',
    header: <Skeleton />
  },
  {
    title: 'The Digital Revolution',
    description: 'Dive into the transformative power of technology.',
    header: <Skeleton />
  },
  {
    title: 'The Art of Design',
    description: 'Discover the beauty of thoughtful and functional design.',
    header: <Skeleton />
  },
  {
    title: 'The Power of Communication',
    description: 'Understand the impact of effective communication in our lives.',
    header: <Skeleton />
  },
  {
    title: 'The Pursuit of Knowledge',
    description: 'Join the quest for understanding and enlightenment.',
    header: <Skeleton />
  },
  {
    title: 'The Joy of Creation',
    description: 'Experience the thrill of bringing ideas to life.',
    header: <Skeleton />
  },
  {
    title: 'The Spirit of Adventure',
    description: 'Embark on exciting journeys and thrilling discoveries.',
    header: <Skeleton />
  }
]
