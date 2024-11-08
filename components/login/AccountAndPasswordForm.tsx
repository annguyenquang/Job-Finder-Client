"use client"

import { Button, Grid2, InputAdornment, TextField } from "@mui/material"
import { useState } from "react";
type AccountAndPasswordFormProps = {
    updateUsername: (s:string) => void,
    updatePassword: (s:string) => void,
    username:string,
    password:string
}

const AccountAndPasswordForm: React.FC<AccountAndPasswordFormProps> = (props) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const revertShowState = () => {
        setIsShowPassword(!isShowPassword);
    }

    const onChangeUsername  = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateUsername(event.target.value);
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updatePassword(event.target.value);
    }

    return (
        <Grid2 rowSpacing={2} container direction={"column"}>
            <TextField value={props.username} onChange={onChangeUsername} label="Tài khoản" variant="outlined"></TextField>
            <TextField value={props.password} onChange={onChangePassword} type={isShowPassword ? 'text' : 'password'} label="Mật khẩu" variant="outlined" slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end"><Button sx={{ textTransform: 'none' }} onClick={revertShowState}>{isShowPassword ? 'hide' : 'show'}</Button></InputAdornment>
                }
            }}></TextField>
        </Grid2>
    );
}

export default AccountAndPasswordForm;