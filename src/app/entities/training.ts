import { User } from './user';

export class Training {
    trainingId: number;
    title: string;
    description: string;
    attendeesAmount: number;
    teacher: User;
    registrationOpen: boolean;
    startDate: string;
    endDate: string;

    constructor( trainingId: number,
        title: string,
        description: string,
        attendeesAmount: number,
        teacher: User,
        registrationOpen: boolean,
        startDate: string,
        endDate: string) {
            this.trainingId = trainingId;
            this.title = title;
            this.description = description;
            this.attendeesAmount = attendeesAmount;
            this.registrationOpen = registrationOpen;
            this.startDate = startDate;
            this.teacher = teacher;
            this.endDate = endDate;
        }
}
