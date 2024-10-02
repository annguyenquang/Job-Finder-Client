import { User } from "@/core/models/example-user-page/User";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

type UserTableProps = {
    users: User[],
};
const UserTable:React.FC<UserTableProps> = (props:UserTableProps) => {
    return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>FirstName</TableCell>
                            <TableCell>LastName</TableCell>
                            <TableCell>Age</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {props.users.map(u => 
                                <TableRow key={u.id}>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.firstName}</TableCell>
                                    <TableCell>{u.lastName}</TableCell>
                                    <TableCell>{u.age}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                </Table>
            </TableContainer>
    );
}

export default UserTable;