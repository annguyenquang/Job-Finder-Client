import React from "react"
import ProfileAction from "./ProfileAction";
import Grid2 from "@mui/material/Grid2/Grid2";
import Button from "@mui/material/Button/Button";
import Paper from "@mui/material/Paper/Paper";
import Stack from "@mui/material/Stack/Stack";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import Accordion from "@mui/material/Accordion/Accordion";
import grey from "@mui/material/colors/grey";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Add from "@mui/icons-material/Add";
import NavigateNext from "@mui/icons-material/NavigateNext";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";

const QuickAction: React.FC = () => {
    const [expanded, setExpanded] = React.useState<boolean>(false)
    function handleExpandedChange(_: React.SyntheticEvent<Element, Event>, expanded: boolean): void {
        setExpanded(expanded);
    }
    return (
        <ProfileAction label={'Thao tác nhanh'}>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Button fullWidth>
                        <Paper sx={{ padding: 1, color: "inherit", width: "100%" }} >
                            <Stack color={"inherit"} alignItems={"center"}>
                                <PictureAsPdf fontSize="large"></PictureAsPdf>
                                Xuất ra PDF
                            </Stack>
                        </Paper>
                    </Button>
                </Grid2>
                <Grid2 size={6}>
                    <Button fullWidth>
                        <Paper sx={{ padding: 1, color: "inherit", width: "100%" }} >
                            <Stack color={"inherit"} alignItems={"center"}>
                                <RemoveRedEye fontSize="large"></RemoveRedEye>
                                Xem hồ sơ
                            </Stack>
                        </Paper>
                    </Button>
                </Grid2>
                <Grid2 size={12}>
                    <Paper>
                        <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Thông tin cơ bản</Button>
                        <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Hồ sơ ứng tuyển (CV)</Button>
                        <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Kinh nghiệm làm việc </Button>
                        <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Trình độ học vấn </Button>
                        <Accordion onChange={handleExpandedChange} expanded={expanded}>
                            <AccordionSummary
                                color={grey[200]}
                                expandIcon={<ArrowDropDown></ArrowDropDown>}>
                                {expanded ? 'Ẩn ít đi' : "Xem thêm"}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Kỹ năng chuyển môn</Button>
                                <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Giới thiệu bản thân</Button>
                                <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Portfolio, file đính kèm và liên kết mạng xã hội </Button>
                                <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Giải thưởng</Button>
                                <Button sx={{ textTransform: "none", textAlign: "start" }} startIcon={<Add></Add>} endIcon={<NavigateNext></NavigateNext>}>Hoạt động ngoại khóa hoặc tình nguyện</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Grid2>
            </Grid2>
        </ProfileAction>)
}

export default QuickAction;