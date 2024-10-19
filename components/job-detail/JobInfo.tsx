import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import JobDescription from './JobDescription';

export const JobInfo: React.FC = () => {
    const AVATAR = "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png"
    const jobDescriptionFromBackend = `
    <strong><h2 style="font-weight: bold;">MÔ TẢ CÔNG VIỆC</h2></strong>
    <ul>
        <li style="list-style-type: disc;">Xây dựng hình ảnh chuyên viên tư vấn chuyên nghiệp, chỉn chu.</li>
        <li style="list-style-type: disc;">Tìm kiếm, xây dựng mối quan hệ và duy trì nhằm chăm sóc khách hàng bằng dịch vụ tốt nhất.</li>
        <li style="list-style-type: disc;">Tìm hiểu nhu cầu, thiết kế & tư vấn sản phẩm phù hợp & tối ưu với khách hàng.</li>
        <li style="list-style-type: disc;">Hỗ trợ chăm sóc khách hàng thông qua các sự kiện, workshop, event mang tới trải nghiệm tốt nhất đến khách hàng.</li>
        <li style="list-style-type: disc;">Xây dựng và đảm bảo hình ảnh thương hiệu công ty.</li>
        <li style="list-style-type: disc;">Đóng góp & tạo doanh thu cho chi nhánh.</li>
    </ul>
    <strong><h2 style="font-weight: bold;">YÊU CẦU</h2></strong>
    <ul>
        <li style="list-style-type: disc;">Ngoại hình sáng, ưu nhìn & tác phong chuyên nghiệp.</li>
        <li style="list-style-type: disc;">Giao tiếp tốt, có kinh nghiệm tư vấn bán hàng & chăm sóc khách hàng lĩnh vực tài chính, ngân hàng & bảo hiểm là 1 lợi thế.</li>
        <li style="list-style-type: disc;">Mục tiêu công việc rõ ràng & hoàn thành mục tiêu đề ra.</li>
        <li style="list-style-type: disc;">Trách nhiệm cao trong công việc.</li>
        <li style="list-style-type: disc;">Có tư duy nhạy bén, sáng tạo & trễ trung.</li>
    </ul>
    <strong><h2 style="font-weight: bold;">QUYỀN LỢI</h2></strong>
    <ul>
        <li style="list-style-type: disc;">Lương từ 12.000.000 – 18.000.000 VNĐ (Chưa bao gồm phụ cấp).</li>
        <li style="list-style-type: disc;">Thưởng theo doanh thu mang về (Tháng/ quý/ năm).</li>
        <li style="list-style-type: disc;">Được hỗ trợ phương tiện làm việc (Ipad).</li>
        <li style="list-style-type: disc;">Thể chăm sóc sức khỏe cho nhân viên.</li>
        <li style="list-style-type: disc;">Được training kiến thức về sản phẩm, kỹ năng mềm, kiến thức về lối sống…</li>
    </ul>
`;

    const requirements = [
        "Dưới một năm kinh nghiệm",
        "Tối thiểu Cao Đẳng",
        "22-35 tuổi"
    ];

    const skills = [
        "B2C Sales",
        "Sales Strategy",
        "Sales Management",
        "Sales and Marketing",
        "Negotiation Skills",
        "Contract Negotiation",
        "Teamwork",
        "Sales Operations"
    ];

    return (
        <Card>
            <CardContent>
                <Box
                    border={1}
                    className="rounded-lg text-gray-400"
                >
                    <Box className="flex flex-row items-center">
                        <img
                            alt=""
                            className='w-20 h-20 m-2'
                            src={AVATAR}>
                        </img>
                        <Box
                            className="flex flex-col"
                        >
                            <Typography
                                className='font-sans text-lg font-semibold text-black'
                            >
                                Ngô Nguyên Đình Khoa
                            </Typography>
                            <Typography
                                color="textSecondary"
                                className='font-sans'
                            >
                                Nhà tuyển dụng · NOUS BY SUN LIFE MIỀN NAM
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography
                    variant='h5'
                    className='font-sans font-semibold text-black mt-4 mb-4'
                >
                    Chi tiết công việc
                </Typography>
                <JobDescription description={jobDescriptionFromBackend} />
                <Typography
                    className='font-sans text-lg font-semibold text-gray-600 mt-4 mb-4'
                >
                    Mô tả công việc
                </Typography>
                {requirements.map((requirement) => (
                    <Chip key={requirement} className='mr-2' label={requirement} />
                ))}
                <Typography
                    className='font-sans text-lg font-semibold text-gray-600 mt-4 mb-4'
                >
                    Kỹ năng
                </Typography>
                {skills.map((skill) => (
                    <Chip key={skill} className='mr-2 mb-2' label={skill} />
                ))}
            </CardContent>
        </Card>
    )
}