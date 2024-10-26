import { Avatar, Button, Card, CardContent, Divider, Grid2, Link, TextField, Typography } from "@mui/material";
import blue from "@mui/material/colors/blue";

const LoginPage: React.FC = () => {
    return (
        <Grid2 sx={{ height: "100vh" }} container justifyContent="center" alignItems={"center"}>
            <Card variant="outlined" className="w-[500px] h-[600px]" sx={{ boxShadow: 3 }}>
                <CardContent>
                    <Grid2 rowSpacing={2} container direction="column" justifyContent={"center"}>
                        <Typography variant="h5" textTransform="uppercase" fontWeight="bold">Login</Typography>

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
                            <Button className="rounded-full">
                                <Avatar src='/google-logo.png'></Avatar>
                            </Button>
                            <Button className="rounded-full">
                                <Avatar src='/facebook-logo.png'></Avatar>
                            </Button>
                            <Button className="rounded-full">
                                <Avatar src='/linkedin-logo.png'></Avatar>
                            </Button>
                        </Grid2>
                    </Grid2>

                </CardContent>
            </Card>
        </Grid2 >
    )
}
export default LoginPage;