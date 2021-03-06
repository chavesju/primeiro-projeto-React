import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appoitments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appoitments.find(appointments =>
      isEqual(appointments.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidv4(), date, provider_id });

    this.appoitments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
