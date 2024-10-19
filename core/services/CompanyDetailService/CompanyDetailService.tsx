import type { CompanyDetail } from "@/models";
import { http } from "../http";

type CompanyResponse = {
    companyDetail: CompanyDetail,
}

const fakeCompanies: CompanyDetail[] = [
    {
        id: '1',
        name: "CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI NHẬT MINH",
        accountId: '1',
        email: 'nguyen3842123123@gmail.com',
        avatar: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png',
        slug: "cong-ty-tnhh-dau-tu-thuong-mai-nhat-minh-1",
        employeeCount: 499,
        description: "Gia nhập thị trường từ năm 2009 với hơn 14 năm kinh nghiệm, Công ty Cổ Phần Ausavina tự hào là doanh nghiệp đi đầu trong lĩnh vực cung cấp các giải pháp và thiết bị xử lý vật liệu cho ngành công nghiệp đá, kính và xây dựng trên toàn thế giới. Được thành lập và phát triển với phương châm giảm thiểu sức lao động và tối ưu chi phí sản xuất nhằm đem đến cho khách hàng môi trường làm việc an toàn, hiệu quả.\n\nAusavina sản xuất đa dạng các dòng sản phẩm, bao gồm thiết bị nâng và xử lý vật liệu, công cụ cắt và các giải pháp vận chuyển & lưu trữ. Mỗi sản phẩm đều có giấy chứng nhận tiêu chuẩn chất lượng với thiết kế ưu việt giúp tăng hiệu quả, đảm bảo an toàn và độ chính xác trong công việc.",
        address: "944/1, Nguyễn Thị Minh Khai, Khu phố Tân Thắng, Phường Tân Bình, Thành Phố Dĩ An, Tỉnh Bình Dương.",
        website: "https://www.ausavina.com",
        contactPerson: "Ms. Hương Nguyễn"
    },
    {
        id: '2',
        name: "CÔNG TY CỔ PHẦN CÔNG NGHỆ ABC",
        accountId: '1',
        email: 'nguyenminhchanh3842@gmail.com',
        avatar: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png',
        slug: "cong-ty-co-phan-cong-nghe-abc-2",
        employeeCount: 100,
        description: "Công ty công nghệ hàng đầu tại Việt Nam.",
        address: "Số 123 Đường ABC, TP. Hồ Chí Minh",
        website: "https://www.ausavina.com",
        contactPerson: "Mr. An Nguyễn"
    }
];

const getCompanyDetail = async (slug: string) => {
    try {
        const companyDetail = fakeCompanies.find(c => c.slug === slug);
        if (!companyDetail) {
            console.log('Company not found')
        }
        return { companyDetail };
    } catch (error) {
        console.log(error);
    }
};


export const CompanyDetailService = { getCompanyDetail };