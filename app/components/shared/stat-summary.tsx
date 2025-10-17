import { useMemo } from 'react'
import { Button } from '../ui/button'
import { RadialBarChart, RadialBar, PolarGrid } from 'recharts'
import formatNumber from '@/helpers/formatNumber'
import type { AppointmentStatusCount } from '@/types/appointment.type'
import CardWrapper from './card-wrapper'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export default function StatSummary({ data, total }: { data: AppointmentStatusCount; total: number }) {
  const chartData = useMemo(
    () => [
      { status: 'total', value: total, fill: 'var(--color-total)' },
      { status: 'appointments', value: data?.PENDING + data?.SCHEDULED || 0, fill: 'var(--color-appointments)' },
      { status: 'consultation', value: data?.COMPLETED || 0, fill: 'var(--color-consultation)' }
    ],
    [data, total]
  )

  const chartConfig = {
    value: {
      label: 'Count'
    },
    total: {
      label: 'Total',
      color: 'var(--chart-1)'
    },
    appointments: {
      label: 'Appointments',
      color: 'var(--chart-4)'
    },
    consultation: {
      label: 'Consultation',
      color: 'var(--chart-5)'
    }
  } satisfies ChartConfig

  const appointment = chartData[1].value
  const consultant = chartData[2].value

  return (
    <CardWrapper className='h-full xl:h-110 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-xl font-semibold'>Summary</h1>
        <Button size='sm' variant='outline' className='cursor-pointer font-normal text-xs hover:underline capitalize'>
          See details
        </Button>
      </div>

      <div className='grow'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey='status' />} />
            <PolarGrid gridType='circle' />
            <RadialBar dataKey='value' />
          </RadialBarChart>
        </ChartContainer>
      </div>
      <div className='flex justify-center items-center gap-8 mt-4'>
        <div className='space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='w-2.5 aspect-square rounded-full bg-[var(--chart-4)]' />
            <span className='text-sm font-medium capitalize'>{chartConfig.appointments.label}</span>
          </div>
          <div className='flex items-center gap-2 ml-6'>
            <h1 className='text-2xl font-bold'>{formatNumber(appointment)}</h1>
            <span className='text-xs text-muted-foreground font-medium'>
              ({((appointment / (appointment + consultant)) * 100).toFixed(0)}%)
            </span>
          </div>
        </div>

        <div className='h-12 w-px bg-border' />

        <div className='space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='w-2.5 aspect-square rounded-full bg-[var(--chart-5)]' />
            <span className='text-sm font-medium capitalize'>{chartConfig.consultation.label}</span>
          </div>
          <div className='flex items-center gap-2 ml-6'>
            <h1 className='text-2xl font-bold'>{formatNumber(consultant)}</h1>
            <span className='text-xs text-muted-foreground font-medium'>
              ({((consultant / (appointment + consultant)) * 100).toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}
