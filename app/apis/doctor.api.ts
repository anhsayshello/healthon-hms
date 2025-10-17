import type { Doctor } from '@/types/doctor.type'
import http from '@/utils/http'

const doctorApi = {
  getDoctors: () => http.get<{ data: Doctor }>('doctor')
}

export default doctorApi
