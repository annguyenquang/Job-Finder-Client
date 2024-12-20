export const ValueTranslations: { [key: string]: string } = {
  Male: 'Nam',
  OneToThreeYears: '1 đến 3 năm',
  LessThanOneYear: 'Ít hơn 1 năm',
  FiveToTenYears: '5 đến 10 năm',
  FreshGraduate: 'Sinh viên mới tốt nghiệp',
  Onsite: 'Tại chỗ',
  CollegeDegree: 'Bằng cấp đại học',
  Contract: 'Hợp đồng',
  ThreeToFiveYears: '3 đến 5 năm',
  Internship: 'Thực tập',
  Fulltime: 'Toàn thời gian',
  MasterDegree: 'Bằng thạc sĩ',
  PrimarySchool: 'Tiểu học',
  Female: 'Nữ',
  'Remote/WFH': 'Làm việc từ xa',
  Doctorate: 'Bằng tiến sĩ',
  BachelorDegree: 'Bằng cử nhân',
  Others: 'Khác',
  SeniorOrVocationalHighSchool: 'Trung học phổ thông hoặc nghề',
  Diploma: 'Bằng tốt nghiệp',
  Hybrid: 'Hình thức kết hợp',
  SecondarySchool: 'Trung học cơ sở',
  Daily: 'Hàng ngày',
  Freelance: 'Làm tự do',
  MoreThanTenYears: 'Hơn 10 năm',
  PartTime: 'Bán thời gian'
}

export const TypeTranslation: { [key: number]: string } = {
  0: 'Loại hợp đồng',
  1: 'Hình thức làm việc',
  2: 'Kinh nghiệm làm việc',
  3: 'Trình độ học vấn',
  4: 'Giới tính'
}

// For constructing the URL in English
export const QueryParams: { [key: number]: string } = {
  0: "JobFilter.CommitmentTypeId",
  1: "JobFilter.WorkArrangementId",
  2: "JobFilter.WorkExperienceRequirementId",
  3: "JobFilter.EducationLevelRequirementId",
  4: "JobFilter.GenderRequirementId",
};

export const COMMITMENTTYPE = 0;
export const WORKARRANGEMENTTYPE = 1;
export const WORKEXPERIENCERETYPE = 2;
export const EDUCATIONLEVELTYPE = 3;
export const GENDERTYPE = 4;