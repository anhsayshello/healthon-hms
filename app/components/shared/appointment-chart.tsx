import type { AppointmentsChart } from '@/types/appointment.type'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function AppointmentChart({ data }: { data: AppointmentsChart }) {
  console.log(data)
  return (
    <div className='bg-background rounded-lg p-4 h-full'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Appointments</h1>
      </div>
      <ResponsiveContainer width='100%' height='90%'>
        <BarChart width={100} height={300} data={data} barSize={25}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#ddd' />

          <XAxis dataKey='name' axisLine={false} tick={{ fill: '#9ca3af', fontSize: 13 }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: '#9ca3af', fontSize: 13 }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#fff', fontSize: 13 }} />
          <Legend
            align='left'
            verticalAlign='top'
            wrapperStyle={{
              paddingTop: '20px',
              paddingBottom: '40px',
              textTransform: 'capitalize',
              fontSize: 13
            }}
          />
          <Bar dataKey='appointment' name='Appointment' fill='#000000' legendType='circle' radius={[10, 10, 0, 0]} />
          <Bar dataKey='completed' name='Completed' fill='#2563eb' legendType='circle' radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
