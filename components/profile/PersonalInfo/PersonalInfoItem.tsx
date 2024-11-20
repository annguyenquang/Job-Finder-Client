import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import blue from "@mui/material/colors/blue";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PersonalInfoItemProps = {
    label: string,
    isEditable?: boolean,
    onEdit?: () => void,
    children?: React.ReactNode
}

const PersonalInfoItem: React.FC<PersonalInfoItemProps> = ({ label, isEditable = false, children, onEdit }) => {
    const props = { label, isEditable, children, onEdit }
    return (
        <Stack spacing={1}>
            <Box
                display={"flex"}
                justifyContent={"space-between"}>
                <Typography
                    variant='h5'
                    fontWeight={"bold"}
                    textTransform={"uppercase"}>
                    {props.label}
                </Typography>
                {
                    props.isEditable &&
                    <Stack
                        onClick={props.onEdit}
                        sx={{ cursor: 'pointer', ":hover": { color: blue[900] }, color: blue[500] }}
                        direction={"row"}>
                        <Edit fontSize='small'></Edit>
                        <Typography
                            fontWeight={"bold"}
                        >CHỈNH SỬA</Typography>
                    </Stack>
                }
            </Box>
            <Divider />
            {props.children}
        </Stack>
    );
}

export default PersonalInfoItem;