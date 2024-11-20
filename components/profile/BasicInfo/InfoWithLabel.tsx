import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const InfoWithLabel: React.FC<{ label: string, value: string }> = (props) => {
    return (
        <Stack>
            <Typography textTransform={"uppercase"}>{props.label}</Typography>
            <Typography>{props.value}</Typography>
        </Stack>
    )
}

export default InfoWithLabel;