import { UserAccount } from "@/models";
import Edit from "@mui/icons-material/Edit";
import blue from "@mui/material/colors/blue";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar/Avatar";
import Image from 'next/image'
import InfoWithLabel from "./InfoWithLabel";

const LeftBasicInfo: React.FC<{ user: UserAccount | null }> = ({ user }) => {
    return (
        <Grid2 container flexDirection={'row'} size={9} spacing={2}>
            {/* <Image width={150} height={150}
                src={'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQupkN1PYtfnG4h8hndNBuk1riMuW2Z8Uf-buFTioHubkTVUJ-9NES18ItN9N1zIra3OJglhvUrOH4WEJc'}
                alt={'Avatar'}></Image> */}
            <Avatar sx={{ width: 150, height: 150, fontSize: "20px" }}>
            </Avatar>
            <Stack direction={'column'}>
                <Stack spacing={2} direction={'row'}>
                    <Typography fontWeight={'bold'} variant={'h5'}>{user?.firstName + ' ' + user?.lastName}</Typography>
                    <Stack color={blue[500]} direction={'row'}>
                        <Edit fontSize={'small'}></Edit>
                        <Typography variant={'body1'}>Chỉnh sửa thông tin cơ bản</Typography>
                    </Stack>
                </Stack>
                <Grid2 container>
                    <Grid2 size={6}>
                        <InfoWithLabel label={'SỐ ĐIỆN THOẠI'} value={user?.phone ? user.phone : "_"}></InfoWithLabel>
                        <InfoWithLabel label={'NGÀY SINH'} value={user?.dateOfBirth ? user.dateOfBirth.toLocaleDateString() : ""}></InfoWithLabel>
                    </Grid2>
                    <Grid2 size={6}>
                        <InfoWithLabel label={'EMAIL'} value={user?.email ? user.email : "_"}></InfoWithLabel>
                        <InfoWithLabel label={'Giới tính'} value="_"></InfoWithLabel>
                    </Grid2>
                </Grid2>
            </Stack>
        </Grid2>
    )
}

export default LeftBasicInfo;