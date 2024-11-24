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
    skills: string[],
    certifications: Certification[],
    selfDescription: string,
} & AccountModel

export type Certification = {
    name: string;
    issuingOrganization: string;
    issueDate?: Date;
    expirationDate?: Date;
    credentialId?: string;
    credentialUrl?: string;

}

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
    slug: string,
    address: string,
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
} & AccountModel

export type Account = CompanyAccount | UserAccount | null;
