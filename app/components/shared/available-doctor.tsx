import type { Doctor, WorkingDays } from '@/types/doctor.type'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CardWrapper from './card-wrapper'
import getToday from '@/helpers/getToday'
import ProfileAvatar from './profile-avatar'
import { Calendar } from 'lucide-react'

export default function AvailableDoctor({ data }: { data: Doctor[] }) {
  console.log(data)
  const today = getToday()
  const availableTime = (days: WorkingDays[]) => {
    const isWorkingDay = days.find((d) => d.day === today)

    return isWorkingDay ? `${isWorkingDay.start_time} - ${isWorkingDay.close_time}` : 'Not available'
  }

  return (
    <CardWrapper>
      <div className='space-y-2 mb-4'>
        <div className='font-semibold text-xl'>Available Doctor</div>
        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
          <Calendar size={18} />
          <span>Today: </span>
          <div>{new Date().toDateString()}</div>
        </div>
      </div>
      <div className='space-y-3'>
        {data &&
          data.map((doctor) => (
            <Card key={doctor.uid} className='gap-3'>
              <CardHeader>
                <div className='flex items-start gap-2'>
                  <ProfileAvatar photoUrl={doctor.photo_url} name={doctor.last_name} />
                  <div>
                    <div>Dr. {doctor.first_name + ' ' + doctor.last_name}</div>
                    <div className='text-sm text-muted-foreground'>{doctor.specialization}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-sm'>Available Time: {availableTime(doctor.working_days)}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </CardWrapper>
  )
}
