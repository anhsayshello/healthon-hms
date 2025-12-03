import type { AppointmentsChart } from '@/types/appointment.type'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import CardWrapper from '../../shared/card-wrapper'

export default function AppointmentChart({ chartData }: { chartData: AppointmentsChart }) {
  const chartConfig = {
    appointment: {
      label: 'Appointment',
      color: 'var(--chart-3)'
    },
    completed: {
      label: 'Completed',
      color: 'var(--chart-4)'
    }
  } satisfies ChartConfig
  return (
    <CardWrapper>
      <h1 className='text-xl font-semibold'>Appointments</h1>
      <div className='bg-background rounded-lg p-4'>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
            <Bar dataKey='appointment' fill='var(--color-appointment)' radius={4} />
            <Bar dataKey='completed' fill='var(--color-completed)' radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </CardWrapper>
  )
}
