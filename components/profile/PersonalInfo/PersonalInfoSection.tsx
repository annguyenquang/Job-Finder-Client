import { UserAccount } from "@/models";
import Person from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import blue from "@mui/material/colors/blue";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonalInfoItem from "./PersonalInfoItem";
import grey from "@mui/material/colors/grey";
import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

type PersonalInfoSectionProps = {
    user: UserAccount | null
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = props => {
    return (
        <Stack spacing={4}>
            <Box sx={{ cursor: "pointer" }} width={"fit-content"}>
                <Stack direction={"row"} color={blue[900]} >
                    <Person fontSize='medium'></Person>
                    <Typography variant='subtitle1'><strong>THÔNG TIN CÁ NHÂN</strong></Typography>
                </Stack>
                <Divider sx={{ borderBottomWidth: 5, borderColor: blue[900] }} />
            </Box>
            <Divider />
            <PersonalInfoItem label='Giới thiệu bản thân' isEditable>
                <Typography>Description</Typography>
            </PersonalInfoItem>
            <PersonalInfoItem label='Kỹ năng'>
                <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
                    <Typography color={grey[700]} textAlign={"center"}>Thông tin về kỹ năng của bạn khiến nhà tuyển dụng để mắt đến bạn hơn</Typography>
                    <Button startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>Bổ sung Kinh nghiệm</Button>
                </Box>
                <PersonalInfoItem label='CHỨNG CHỈ'>
                    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
                        <Typography color={grey[700]} textAlign={"center"}>Thêm các chứng chỉ mà bạn có giúp gây ấn tưởng với nhà tuyển dụng</Typography>
                        <Button startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>Thêm chứng chỉ</Button>
                    </Box>
                </PersonalInfoItem>
                <PersonalInfoItem label='Vị hồ sơ ứng tuyển (CV)'>
                    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
                        <Typography color={grey[700]} textAlign={"center"}>77.4% nhà tuyển dụng rất coi trọng hồ sơ xin việc trong quá trình tuyển dụng</Typography>
                        <Button startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>Thêm hồ sơ</Button>
                    </Box>
                </PersonalInfoItem>
                <PersonalInfoItem label='Kinh nghiệm làm việc'>
                    <Box display={"flex"} gap={1} alignItems={"center"} flexDirection={"column"}>
                        <Typography color={grey[700]} textAlign={"center"}>77.9% nhà tuyển dụng được khảo sát cho rằng kinh nghiệm làm việc sẽ là một trong những yếu tố quan trọng nhất trong CV ứng tuyển.</Typography>
                        <Button startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>Thêm kinh nghiệm làm việc</Button>
                    </Box>
                </PersonalInfoItem>
                <PersonalInfoItem label='Trình độ học vấn'>
                    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
                        <Typography color={grey[700]} textAlign={"center"}>Thông tin về quá trình học vấn sẽ giúp tăng cơ hội phỏng vấn của bạn đến 23%</Typography>
                        <Button startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>Bổ sung Trình độ học vấnThêm kinh nghiệm làm việc</Button>
                    </Box>
                </PersonalInfoItem>
            </PersonalInfoItem>
            <PersonalInfoItem label='Portfolio, file đính kèm và liên kết mạng xã hội'>
                <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
                    <Typography color={grey[700]} textAlign={"center"}>Một hồ sơ hoàn chỉnh nhân đôi cơ hội có được những việc làm tốt nhất trên Glints.</Typography>
                    <Button startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>Thêm danh mục</Button>
                </Box>
            </PersonalInfoItem>
        </Stack >
    );
}