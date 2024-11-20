import Add from "@mui/icons-material/Add";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import NavigateNext from "@mui/icons-material/NavigateNext";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import grey from "@mui/material/colors/grey";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import React from "react";
import { SyntheticEvent } from "react";
import ProfileAction from "./ProfileAction";

const QuickAction: React.FC = () => {
    const [expanded, setExpanded] = React.useState<boolean>(false)
    function handleExpandedChange(_: SyntheticEvent<Element, Event>, expanded: boolean): void {
        setExpanded(expanded);
    }
    return (
        <ProfileAction label={'Thao tác nhanh'}>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Paper>
                        <Button endIcon={<NavigateNext></NavigateNext>}>Xuất ra PDF </Button>
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    <Paper>
                        <Button endIcon={<NavigateNext></NavigateNext>}>Xem hồ sơ</Button>
                    </Paper>
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
                                {expanded ? 'Xem thêm' : "Xem ít hơn"}
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