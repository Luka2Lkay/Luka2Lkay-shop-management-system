import { Employee } from "./employee"

export interface Manager {
    id: number,
    employeeNumber: string,
    fullName: string,
    dob: string, 
    gender: string, 
    email: string, 
    isActive: boolean
    managedEmployees: Employee[]
}