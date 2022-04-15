import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contace-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    ){}

    async seed(){
      //crete company's ceo
      const ceo = this.employeeRepo.create({name: "mr.CEO"});
      await this.employeeRepo.save(ceo); //save to db
      
      //ceo's contact info
      const ceoContactInfo = this.contactInfoRepo.create({
        email: "someone@gmail.com",
        //employeeID: ceo.id;
      });

      ceoContactInfo.employee = ceo;
      await this.contactInfoRepo.save(ceoContactInfo); //save to db
    
      //create mangager
      const manager = this.employeeRepo.create({
        name: "mchi",
        manager: ceo,
      });

      //create tasks
      const task1 = this.taskRepo.create({name: 'alo1' });
      await this.taskRepo.save(task1);
      const task2 = this.taskRepo.create({name: 'alo2'});
      await this.taskRepo.save(task2);

      //add tasks to manager's task
      manager.tasks = [task1, task2];

      //create meeting
      const meeting1 = this.meetingRepo.create({ zoomUrl: "www.com"});
      meeting1.attendees = [ceo] //add ceo as an attendant
      await this.meetingRepo.save(meeting1);

      manager.meetings = [meeting1]; // add manager as an attendant

      await this.employeeRepo.save(manager); //save manager
    }

    getEmployeeByID(id: number){
      return this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .where('employee.id = :employeeID', {employeeID: id})
      .getOne();
    }

    delEmployeeByID(id: number){
      return this.employeeRepo.delete(id);
    }

  getHello(): string {
    return 'Hello World!';
  }
}
