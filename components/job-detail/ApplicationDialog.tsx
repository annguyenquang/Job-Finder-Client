import { Job } from "@/models";
import { formatFileSize } from "@/utils";
import { Delete } from "@mui/icons-material";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Email from "@mui/icons-material/Email";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import { IconButton, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import lightBlue from "@mui/material/colors/lightBlue";
import red from "@mui/material/colors/red";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { MouseEvent } from "react";
import { ChangeEvent, useEffect } from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type ApplicationDialogProps = {
    isOpen: boolean;
    cvFile: File | null;
    phoneNumber: string | null;
    hasCoverLetter: boolean;
    coverLetter: string | null;
    job: Job;
    onClose: () => void;
    setCvFile: (file: File | null) => void;
    setPhoneNumber: (newPhone: string) => void;
    sendApplication: () => Promise<void>;
    setCoverLetter: (newValue: string) => void;
    setHashCoverLetter: (newValue: boolean) => void;
}

const ApplicationDialog: React.FC<ApplicationDialogProps> = (props) => {
    useEffect(() => {
        console.log("🚀 ~ props.phoneNumber:", props.phoneNumber)
    }, [props.phoneNumber])
    // useEffect(() => {
    //     console.log("🚀 ~ props.coverLetter:", props.coverLetter)
    // }, [props.coverLetter])

    // useEffect(() => {
    //     console.log("🚀 ~ props.cvFile:", props.cvFile)
    // }, [props.cvFile])
    const changePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        props.setPhoneNumber(newValue);
    }
    const toggleHasCoverLetter = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        props.setHashCoverLetter(!props.hasCoverLetter);
        console.log("🚀 ~ toggleHasCoverLetter ~ checked:", checked)
    }

    const changeCoverLetter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        props.setCoverLetter(newValue);
    }
    const changeFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.setCvFile(file);
            console.log("File uploaded:", file.name);
        }
    };
    const onClickDropFile = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dropFile();
    }
    const dropFile = () => {
        props.setCvFile(null);
    }

    function logForm(): void {
        console.log("🚀 ~ logForm ~ props.phoneNumber:", props.phoneNumber)
        console.log("🚀 ~ logForm ~ props.hasCoverLetter:", props.hasCoverLetter)
        console.log("🚀 ~ logForm ~ props.coverLetter:", props.coverLetter)
        console.log("🚀 ~ logForm ~ props.cvFile:", props.cvFile)
    }

    return (
        <Dialog
            TransitionComponent={Transition}
            onClose={props.onClose}
            open={props.isOpen}>
            <DialogTitle>Bạn đang ứng tuyển cho <strong>{props.job.company.name}</strong> với vị
                trí <strong>{props.job.title}</strong>
                <Image
                    alt={props.job.company.name}
                    width={100}
                    height={100}
                    src={props.job.company.logo}></Image>
            </DialogTitle>
            <DialogContent>
                <Box sx={{
                    display: "flex",
                    paddingY: 1
                }}>
                    <InsertDriveFile sx={{ marginRight: 1 }}></InsertDriveFile>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Hồ sơ xin việc *
                    </Typography>
                </Box>
                <label htmlFor="upload-cv">
                    {props.cvFile ?
                        <Box sx={{
                            '&:hover': {
                                bgcolor: blue[300],
                                color: "white"
                            },
                            '&:has(> .delete-button:hover)': {
                                bgcolor: lightBlue[50], // Revert to original when hovering over B
                                color: blue[500]
                            },
                            cursor: "pointer",
                            border: 1,
                            borderColor: blue[500],
                            borderStyle: "dashed",
                            borderRadius: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: 2,
                            background: lightBlue[50],
                            color: blue[500]
                        }}>
                            <Typography variant="h6" textAlign={"center"}>{props.cvFile.name}</Typography>
                            <Typography color={grey[500]} textAlign={"center"}>{formatFileSize(props.cvFile.size)}</Typography>
                            <Button
                                className="delete-button"
                                onClick={onClickDropFile}
                                startIcon={<Delete />}
                                sx={{
                                    color: red[500],
                                    "&:hover": {
                                        color: "white",
                                        bgcolor: "red"
                                    }
                                }}>
                                Xóa tập tin
                            </Button>
                        </Box>
                        :
                        <Box sx={{ cursor: "pointer", border: 1, borderColor: blue[500], borderStyle: "dashed", borderRadius: 1, display: "flex", justifyContent: "center", padding: 2, background: lightBlue[50], color: blue[500] }}>
                            <InsertDriveFile sx={{ marginX: 1 }}></InsertDriveFile>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Đăng tải hồ sơ của tôi
                            </Typography>
                        </Box>
                    }
                </label>
                <Input
                    onChange={changeFile}
                    sx={{ display: "none" }}
                    id="upload-cv"
                    type="file"></Input>
                <Typography
                    paddingY={1}
                    variant='body2'
                    sx={{ color: grey[500] }} >
                    Lưu ý : đảm bảo hồ sơ xin việc của bạn sử dụng ngôn ngữ trùng khớp với mô tả công việc (Ví dụ: viết CV bằng tiếng Anh nếu mô tả công việc bằng tiếng Anh) và đăng tải dưới dạng PDF dưới 5MB.
                    Hồ sơ đã đăng tải sẽ được lưu lại cho lần nộp đơn sau.
                </Typography>
                <TextField
                    fullWidth
                    onChange={changePhoneNumber}
                    value={props.phoneNumber}
                    required label='Số điện thoại' type="number" sx={{ marginTop: 1 }} slotProps={{
                        input: {
                            startAdornment:
                                <Box sx={{ display: "inline-flex" }}>
                                    <Typography>+84</Typography>
                                    <Divider sx={{ opacity: 1, borderRightWidth: 2, marginX: 1 }} variant='fullWidth' orientation='vertical' flexItem></Divider>
                                </Box>
                        }
                    }}></TextField>
                <Box display="flex" paddingY={1}>
                    <Email sx={{ marginRight: 1 }}></Email>
                    <Typography fontWeight={"bold"}>
                        Thư xin việc
                    </Typography>
                </Box>
                <FormControl fullWidth>
                    <FormControlLabel
                        label="Tôi đã có thư xin việc"
                        control={<Checkbox onChange={toggleHasCoverLetter} checked={props.hasCoverLetter}></Checkbox>}>
                    </FormControlLabel>
                    {props.hasCoverLetter &&
                        <TextField
                            onChange={changeCoverLetter}
                            value={props.coverLetter}
                            label="Viết thư xin việc của bạn"
                            rows={4}
                            multiline
                            fullWidth></TextField>
                    }
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Box
                    width={"100%"}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center">
                    <Button
                        onClick={logForm}
                        sx={{ height: 50 }}
                        fullWidth
                        variant="contained"
                        color="primary">
                        ỨNG TUYỂN NGAY
                    </Button>
                    <Box paddingY={1}>
                        <Typography textAlign="center">Bạn chưa chuẩn bị hồ sơ?</Typography>
                        <Typography textAlign={"center"}>Hãy lưu lại việc làm để ứng tuyển sau.</Typography>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        color={blue[500]}>
                        <BookmarkBorder sx={{ marginRight: 1 }}></BookmarkBorder>
                        <Typography textAlign={"center"} >
                            Đánh dấu lưu lại vị trí công việc
                        </Typography>
                    </Box>
                </Box>
            </DialogActions>
        </Dialog >
    );
}

export default ApplicationDialog;