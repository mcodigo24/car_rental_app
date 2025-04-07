import { CarDto } from "./car.dto";
import { CustomerDto } from "./customer.dto";

export interface RentalDto {
  id?: number;
  customerId: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  car?: CarDto,
  customer?: CustomerDto
}