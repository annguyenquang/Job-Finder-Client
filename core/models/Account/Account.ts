export type AccountModel = {
    id: string,
    username: string,
    phone: string,
    email: string,
};

export type UserAccount = {
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
} & AccountModel

export type CompanyAccount = {
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

export type Account =  CompanyAccount | UserAccount | null;
