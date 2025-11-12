import { RoleEnum } from '@/types/role.type'
import {
  LayoutDashboard,
  User,
  ListOrdered,
  SquareActivity,
  Receipt,
  Pill,
  Bell,
  Logs,
  Settings,
  SquareLibrary,
  HeartPulse,
  Users2,
  Users,
  FlaskConical,
  Beaker,
  Cross,
  Syringe
} from 'lucide-react'
import path from './path'

const ALL_ROLE = [
  RoleEnum.ADMIN,
  RoleEnum.DOCTOR,
  RoleEnum.PATIENT,
  RoleEnum.NURSE,
  RoleEnum.CASHIER,
  RoleEnum.LAB_TECHNICIAN
]

export const SIDEBAR_LINKS = [
  {
    label: 'Menu',
    links: [
      {
        name: 'Dashboard',
        path: path.dashboard,
        access: ALL_ROLE,
        icon: LayoutDashboard,
        tooltip: 'dashboard'
      },
      {
        name: 'Profile',
        path: path.patient.profile,
        access: [RoleEnum.PATIENT],
        icon: User,
        tooltip: 'profile'
      }
    ]
  },
  {
    label: 'Manage',
    links: [
      {
        name: 'Users',
        path: path.admin.users,
        access: [RoleEnum.ADMIN],
        icon: Users,
        tooltip: 'users'
      },
      {
        name: 'Doctors',
        path: path.record.doctors,
        access: [RoleEnum.ADMIN],
        icon: Users,
        tooltip: 'doctors'
      },
      {
        name: 'Patients',
        path: path.record.patients,
        access: ALL_ROLE,
        icon: Users2,
        tooltip: 'patients'
      },
      {
        name: 'Staffs',
        path: path.record.staffs,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR],
        icon: Users,
        tooltip: 'staffs'
      },
      {
        name: 'Appointments',
        path: path.record.appointments,
        access: ALL_ROLE,
        icon: ListOrdered,
        tooltip: 'appointments'
      },
      {
        name: 'Vital Signs',
        path: path.nurse.vitalSigns,
        access: [RoleEnum.NURSE],
        icon: HeartPulse,
        tooltip: 'vital signs'
      },
      {
        name: 'Lab Requests',
        path: path.lab.requests,
        access: [RoleEnum.LAB_TECHNICIAN],
        icon: Beaker,
        tooltip: 'lab requests'
      },
      {
        name: 'Lab Tests',
        path: path.lab.tests,
        access: [RoleEnum.LAB_TECHNICIAN],
        icon: FlaskConical,
        tooltip: 'lab tests'
      },
      {
        name: 'Lab Services',
        path: path.lab.services,
        access: [RoleEnum.LAB_TECHNICIAN],
        icon: Cross,
        tooltip: 'lab services'
      },
      {
        name: 'Medications',
        path: path.cashier.medication,
        access: [RoleEnum.CASHIER],
        icon: Syringe,
        tooltip: 'medications'
      },
      {
        name: 'Medical Records',
        path: path.record.medicalRecords,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.NURSE, RoleEnum.LAB_TECHNICIAN],
        icon: SquareActivity,
        tooltip: 'medical records'
      },
      {
        name: 'Billing Overview',
        path: path.record.billingOverview,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR],
        icon: Receipt,
        tooltip: 'billing overview'
      },
      {
        name: 'Administer Medications',
        path: path.nurse.administerMedications,
        access: [RoleEnum.ADMIN, RoleEnum.DOCTOR, RoleEnum.NURSE],
        icon: Pill,
        tooltip: 'adminster medications'
      },

      {
        name: 'Records',
        path: path.patient.records,
        access: [RoleEnum.PATIENT],
        icon: SquareLibrary,
        tooltip: 'records'
      },
      {
        name: 'Prescriptions',
        path: path.patient.prescriptions,
        access: [RoleEnum.PATIENT],
        icon: Pill,
        tooltip: 'prescriptions'
      },
      {
        name: 'Billing',
        path: path.patient.billing,
        access: [RoleEnum.PATIENT],
        icon: Receipt,
        tooltip: 'billing'
      }
    ]
  },
  {
    label: 'System',
    links: [
      {
        name: 'Notifications',
        path: path.notifications,
        access: ALL_ROLE,
        icon: Bell,
        tooltip: 'notifications'
      },
      {
        name: 'Audit Logs',
        path: path.admin.auditLogs,
        access: [RoleEnum.ADMIN],
        icon: Logs,
        tooltip: 'audit logs'
      },
      {
        name: 'Settings',
        path: path.admin.settings,
        access: [RoleEnum.ADMIN],
        icon: Settings,
        tooltip: 'settings'
      }
    ]
  }
]
