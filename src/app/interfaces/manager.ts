import { Employee } from "./employee"

export interface Manager {
    id: number,
    currentManager: string,
    employeeNumber: string,
    fullName: string,
    managerId: number,
    dob: string, 
    gender: string, 
    email: string, 
    isActive: boolean
    managedEmployees: Employee[]
}
