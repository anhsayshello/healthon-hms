import { useMemo } from 'react'
import { Button } from '../ui/button'
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { Users } from 'lucide-react'
import formatNumber from '@/helpers/formatNumber'
import type { AppointmentStatusCount } from '@/types/appointment.type'
import CardWrapper from './card-wrapper'

export default function StatSummary({ data, total }: { data: AppointmentStatusCount; total: number }) {
  const dataInfo = useMemo(
    () => [
      { name: 'Total', count: total, fill: '#fff' },
      { name: 'Appointments', count: data?.PENDING + data?.SCHEDULED || 0, fill: '#000000' },
      { name: 'Consultation', count: data?.COMPLETED || 0, fill: '#2563eb' }
    ],
    [data, total]
  )

  const appointment = dataInfo[1].count
  const consultant = dataInfo[2].count

  return (
    <CardWrapper className='h-full xl:h-110 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Summary</h1>
        <Button size='sm' variant='outline' className='cursor-pointer font-normal text-xs hover:underline capitalize'>
          See details
        </Button>
      </div>
      <div className='relative w-full h-50 lg:h-60 xl:h-[75%]'>
        <ResponsiveContainer>
          <RadialBarChart cx='50%' cy='50%' innerRadius='40%' outerRadius='100%' barSize={32} data={dataInfo}>
            <RadialBar background dataKey='count' />
          </RadialBarChart>
        </ResponsiveContainer>
        <Users size={30} className='absolute top-1/2 left-1/2 -translate-1/2' />
      </div>
      <div className='flex justify-evenly items-center'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <div className='w-4 aspect-square bg-[#000000] rounded-xl' />
            <h1 className='font-bold'>{formatNumber(appointment)}</h1>
          </div>
          <h2 className='text-xs text-muted-foreground'>
            <span>{dataInfo[1].name}</span>
            <span className='ml-1'>{((appointment / (appointment + consultant)) * 100).toFixed(0)}</span>
          </h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <div className='w-4 aspect-square bg-[#2563eb] rounded-xl' />
            <h1 className='font-bold'>{formatNumber(consultant)}</h1>
          </div>
          <h2 className='text-xs text-muted-foreground'>
            <span>{dataInfo[2].name}</span>
            <span className='ml-1'>{((consultant / (appointment + consultant)) * 100).toFixed(0)}</span>
          </h2>
        </div>
      </div>
    </CardWrapper>
  )
}
