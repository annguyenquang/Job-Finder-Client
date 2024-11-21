import { UserAccount } from "@/models"
import Grid2 from "@mui/material/Grid2"
import LeftBasicInfo from "./LeftBasicInfo"
import RightBasicInfo from "./RightBasicInfo"

export const BasicInfoSection: React.FC<{ user: UserAccount | null }> = ({ user }) => {

    return (
        <Grid2 container>
            <LeftBasicInfo user={user}></LeftBasicInfo>
            <RightBasicInfo></RightBasicInfo>
        </Grid2>
    )
}