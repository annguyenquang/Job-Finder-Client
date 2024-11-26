import AddCircle from "@mui/icons-material/AddCircle";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PersonalInfoItemProps = {
    label: string,
    isEditable?: boolean,
    onEdit?: () => void,
    children?: React.ReactNode,
    emptyLabel?: string,
    onClickAddPersonalInfo?: () => void,
}

const PersonalInfoItem: React.FC<PersonalInfoItemProps> = ({ emptyLabel, label, isEditable = false, children, onEdit, onClickAddPersonalInfo = () => { } }) => {
    const props = { label, isEditable, children, onEdit, onClickAddPersonalInfo, emptyLabel };
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
            {props.children ??
                <EmptyInfo
                    label={props.emptyLabel ?? ""}
                    onClickAddPersonalInfo={props.onClickAddPersonalInfo}
                    addPersonalInfoButtonText={"BỔ SUNG " + props.label} />}
        </Stack>
    );
}

type EmptyInfoProps = {
    label: string,
    onClickAddPersonalInfo: () => void,
    addPersonalInfoButtonText: string,
}
const EmptyInfo: React.FC<EmptyInfoProps> = props => {
    return (
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"} gap={1}>
            <Typography color={grey[700]} textAlign={"center"}>{props.label}</Typography>
            <Button onClick={props.onClickAddPersonalInfo} startIcon={<AddCircle />} sx={{ width: "fit-content", fontWeight: "" }}>{props.addPersonalInfoButtonText}</Button>
        </Box>
    )
}

export default PersonalInfoItem;