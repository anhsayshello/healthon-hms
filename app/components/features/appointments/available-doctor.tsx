import type { Doctor, WorkingDay } from '@/types/doctor.type'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import CardWrapper from '../../shared/card-wrapper'
import getToday from '@/helpers/getToday'
import { Calendar } from 'lucide-react'
import UserInfo from '../../shared/user-info'

export default function AvailableDoctor({ data }: { data: Doctor[] }) {
  const today = getToday()
  const availableTime = (days: WorkingDay[]) => {
    const isWorkingDay = days.find((d) => d.day === today)

    return isWorkingDay ? `${isWorkingDay.start_time} - ${isWorkingDay.close_time}` : 'Not available'
  }

  return (
    <CardWrapper>
      <div className='space-y-1.5'>
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
                <UserInfo
                  size='lg'
                  firstName={doctor.first_name}
                  lastName={doctor.last_name}
                  photoUrl={doctor.photo_url}
                  description={doctor.specialization}
                />
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
