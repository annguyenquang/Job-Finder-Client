export type AccountModel = {
    id: string,
    username: string,
    phone: string,
    email: string,
};

export type User = {
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
} & AccountModel

export type Company = {
    name: string,
    emailContact: string,
    phoneContact: string,
    description: string,
    employeeCount: number,
    provinceId: number,
    districtId: number,
    website: string,
    logo: string,
    industry: string,
} & AccountModel

export type Account =  Company | User | null;
