import { Avatar, Button, Grid2, Typography } from "@mui/material"

export const SocialAuthOptions: React.FC = () => {
    return (
        <Grid2 columnGap={5} justifyContent={"center"} alignItems={"center"} container>
            <Button color="inherit" className="w-full justify-start p-3" variant="outlined">
                <Avatar className="w-[26px] h-[26px] mr-3" variant="square" src='/google-logo.png'></Avatar>
                <Typography textTransform={'none'}>Countinue with Google</Typography>
            </Button>
            <Button color="inherit" className="w-full justify-start p-3" variant="outlined">
                <Avatar className="w-[26px] h-[26px] mr-3" variant="square" src='/facebook-logo.png'></Avatar>
                <Typography textTransform={'none'}>Countinue with Facebook</Typography>

            </Button>
            <Button color="inherit" className="w-full justify-start p-3" variant="outlined">
                <Avatar className="w-[26px] h-[26px] mr-3" variant="square" src='/linkedin-logo.png'></Avatar>
                <Typography textTransform={'none'}>Countinue with LinkedIn</Typography>
            </Button>
        </Grid2>
    )
}
