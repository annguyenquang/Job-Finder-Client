import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import ProfileAction from "./ProfileAction";
import Button from "@mui/material/Button";
import NavigateNext from "@mui/icons-material/NavigateNext";
import QuickAction from "./QuickAction";

const RightBasicInfo: React.FC = () => {
    return (
        <Grid2 size={3}>
            <Stack>
                <ProfileAction label={'Quản lý tài khoản'}>
                    <Button endIcon={<NavigateNext></NavigateNext>}>Không tìm kiếm cơ hội mới</Button>
                </ProfileAction>
                <QuickAction></QuickAction>
            </Stack>
        </Grid2>
    )
}
export default RightBasicInfo;