import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProfileAction: React.FC<{ label: string; evelation?: number; children: React.ReactNode }> = ({ label, evelation = 0, children }) => {
    return (
        <Stack>
            <Typography variant={'h6'}>{label}</Typography>
            <Paper elevation={evelation}>
                {children}
            </Paper>
        </Stack>
    )
}

export default ProfileAction;