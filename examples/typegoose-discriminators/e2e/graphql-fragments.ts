export const TODO_TASK_FRAGMENT = `
  fragment TodoTaskFragment on TodoTask {
    id
    title
    completed
    documentType
    priority
    location {
      id
      address
      city
      state
      zipCode
    }
  }
`

export const TODO_APPOINTMENT_FRAGMENT = `
  fragment TodoAppointmentFragment on TodoAppointment {
    id
    title
    completed
    documentType
    dateTime
    participants
    location {
      id
      address
      city
      state
      zipCode
    }
  }
`
