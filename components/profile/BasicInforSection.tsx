import { UserAccount } from "@/models"
import Grid2 from "@mui/material/Grid2"
import RightBasicInfo from "./RightBasicInfo";
import LeftBasicInfo from "./LeftBasicInfo";

export const BasicInfoSection: React.FC<{ user: UserAccount | null }> = ({ user }) => {

    return (
        <Grid2 container>
            <RightBasicInfo user={user}></RightBasicInfo>
            <LeftBasicInfo></LeftBasicInfo>
        </Grid2>
    )
}