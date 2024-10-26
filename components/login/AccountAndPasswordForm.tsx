"use client"

import { Button, Grid2, InputAdornment, TextField } from "@mui/material"
import { useState } from "react";

const AccountAndPasswordForm: React.FC = () => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const revertShowState = () => {
        setIsShowPassword(!isShowPassword);
    }
    return (
        <Grid2 rowSpacing={2} container direction={"column"}>
            <TextField label="Tài khoản" variant="outlined"></TextField>
            <TextField type={isShowPassword ? 'text' : 'password'} label="Mật khẩu" variant="outlined" slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end"><Button sx={{ textTransform: 'none' }} onClick={revertShowState}>{isShowPassword ? 'hide' : 'show'}</Button></InputAdornment>
                }
            }}></TextField>
        </Grid2>
    );
}

export default AccountAndPasswordForm;