import type { Currency } from './index.type'
import type { Prescription } from './medical-record.type'

export interface Medication {
  id: number
  medication_name: string
  description?: string | null
  unit_price: number
  currency: Currency
  unit_type: string
  manufacturer?: string | null
  stock_quantity: number
  min_stock_level?: number
  created_at: Date
  updated_at: Date

  prescriptions?: Prescription[]
}
