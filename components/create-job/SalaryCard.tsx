import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { useCreateJobStore } from '@/stores';

export const SalaryCard: React.FC = () => {
    const createJobStore = useCreateJobStore();
    const [showSalary, setShowSalary] = React.useState(createJobStore.jobData.salary === 0 ? true : !!createJobStore.jobData.salary);


    const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '') {
            createJobStore.setSalary(null);
        } else {
            const numberValue = parseInt(value, 10);
            if (!isNaN(numberValue)) {
                createJobStore.setSalary(numberValue);
            }
        }
    };

    const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setShowSalary(isChecked);

        if (!isChecked) {
            createJobStore.setSalary(null);
        }

        if (createJobStore.jobData.salary === null) {
            setShowSalary(!isChecked);
        }
    };

    React.useEffect(() => {
        if (!showSalary) {
            createJobStore.setSalary(null);
        }
    }, [showSalary]);

    React.useEffect(() => {
        if (createJobStore.jobData.salary === null) {
            setShowSalary(false);
        } else {
            setShowSalary(true);
        }
    }, [createJobStore.jobData.salary]);

    return (
        <Card
            className="mb-4"
        >
            <Box
                className="p-2 flex-row flex">
                <Typography
                    className='font-semibold font-sans text-lg pl-2 pt-2 pb-2'
                >
                    Mức lương
                </Typography>
                <Typography
                    className='font-semibold font-sans text-red-600 text-xl pt-2'
                >
                    *
                </Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box
                className="p-2 mt-2"
            >
                <Box
                    className="flex flex-row"
                >
                    <Box className="mr-1">
                        <Typography className="text-sm font-sans pl-2 pb-1">Mức lương (đơn vị: triệu đồng, 1 = 1.000.000 VNĐ)</Typography>
                        <TextField
                            id="salary"
                            size="small"
                            variant="outlined"
                            placeholder="1 = 1.000.000 VND"
                            value={createJobStore.jobData.salary ?? ''}
                            onChange={handleSalaryChange}
                            className="pl-2 min-w-60 pb-4"
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    className="flex flex-row"
                >
                    <Typography
                        className='font-semibold font-sans text-sm p-2'
                    >
                        Hiển thị mức lương
                    </Typography>
                    <Switch
                        checked={showSalary}
                        onChange={handleToggleChange}
                        color="primary"
                    />
                </Box>

                <Typography
                    className='text-sm font-sans pl-2 pb-1'
                >
                    Lương sẽ được hiển thị cho ứng viên.
                </Typography>
            </Box>
        </Card>
    )
}