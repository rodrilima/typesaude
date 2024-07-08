import { generateAdmin } from "./admin"
import { generateAppointments } from "./appointments"
import { generateConsultations } from "./consultations"
import { generateDoctors } from "./doctors"
import { generatePatients } from "./patients"
import { generateServices } from "./services"
import { generateUsers } from "./users"

async function main() {
  await generateAdmin()
  await generateUsers(99)

  const doctors = await generateDoctors(100)
  const patients = await generatePatients(100)
  const services = await generateServices(100)

  await generateAppointments(
    doctors.map(d => d.id),
    patients.map(d => d.id),
    services.map(d => d.id),
    20
  )

  await generateConsultations(
    doctors.map(d => d.id),
    patients.map(d => d.id),
    services.map(d => d.id),
    20
  )
}

main()