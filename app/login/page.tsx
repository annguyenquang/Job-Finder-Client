import { Avatar, Button, Card, CardContent, Divider, Grid2, Link, TextField, Typography } from "@mui/material";
import blue from "@mui/material/colors/blue";
import Image from "next/image";

const LoginPage: React.FC = () => {
    return (
        <Grid2 direction={"column"} container justifyContent="center" alignItems={"center"}>
            <div className="w-full">
                <Image src="/jobfinder-logo.png" width={180} height={180} alt="JobFinder logo"></Image>
            </div>
            <Card variant="outlined" className="w-[450px] h-[600px]" sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Grid2 rowSpacing={2} container direction="column" justifyContent={"center"}>
                        <Typography variant="h5" textTransform="uppercase" fontWeight="bold">Sign in</Typography>

                        <Divider />

                        <Typography variant="h6">Đăng nhập để tiếp tục</Typography>

                        <Grid2 rowSpacing={2} container direction={"column"}>
                            <TextField label="Tài khoản" variant="outlined"></TextField>
                            <TextField label="Mật khẩu" variant="outlined"></TextField>
                        </Grid2>

                        <Link textAlign={"center"} color={blue[600]} href="#">Quên mật khẩu?</Link>

                        <Button variant="contained">Đăng nhập</Button>

                        <Typography textAlign={"center"}>Hoặc</Typography>

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
                    </Grid2>

                </CardContent>
            </Card>
        </Grid2 >
    )
}
export default LoginPage;