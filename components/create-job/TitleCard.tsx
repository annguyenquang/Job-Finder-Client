import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useMetadataStore } from '@/stores/MetadataStore';
import { useCreateJobStore } from '@/stores';

export const TitleCard: React.FC = () => {
    const metadataStore = useMetadataStore();
    const createJobStore = useCreateJobStore();

    const handleJobTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        createJobStore.setJobTitle(event.target.value);
    };

    const handleWorkTypeChange = (event: SelectChangeEvent<string>) => {
        createJobStore.setCommitmentTypeId(event.target.value);
    };

    React.useEffect(() => {
        console.log("Title jobStore: ", createJobStore.jobData.title)
    }, [createJobStore.jobData.title])

    React.useEffect(() => {
        console.log("CommitmentTypeId jobStore: ", createJobStore.jobData.commitmentType)
    }, [createJobStore.jobData.commitmentType])

    React.useEffect(() => {
        const fetchCommitment = async () => {
            await metadataStore.loadMetadataByCommitment();
        };

        fetchCommitment();
    }, []);

    return (
        <Card
            className="mb-4"
        >
            <Box
                className="p-2 flex-row flex">
                <Typography
                    className='font-semibold font-sans text-lg pl-2 pt-2 pb-2'
                >
                    Vai trò & loại hình công việc
                </Typography>
                <Typography
                    className='font-semibold font-sans text-red-600 text-xl pt-2'
                >
                    *
                </Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box
                className="p-2"
            >
                <Typography
                    className='font-semibold font-sans text-base p-2'
                >
                    Tiêu đề công việc (sẽ được hiển thị trên tin đăng)
                </Typography>

                <Typography
                    className='text-sm font-sans pl-2 pb-1'
                >
                    Chỉnh sửa tiêu đề
                </Typography>

                <TextField
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="Tiêu đề"
                    className="pl-2 min-w-96 pb-6"
                    value={createJobStore.jobData.title}
                    onChange={handleJobTitleChange}
                    slotProps={{
                        input: {
                            inputProps: {
                                maxLength: 40,
                            }
                        }
                    }}
                />

                <Typography
                    className='font-semibold font-sans text-base pl-2 pb-2'
                >
                    Loại hình công việc
                </Typography>

                <FormControl
                    size="small"
                    className="pl-2 min-w-96 pb-4"
                >
                    <InputLabel
                        id="demo-simple-select-label"
                        className="text-sm"
                    >Loại hình</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Loại hình"
                        value={createJobStore.jobData.commitmentType.id}
                        onChange={handleWorkTypeChange}
                    >
                        <MenuItem disabled value="">
                            <em>Tất cả loại hình</em>
                        </MenuItem>
                        {metadataStore.listCommitment.length > 0 && metadataStore.listCommitment.map((metadata) => (
                            <MenuItem
                                key={metadata.id}
                                value={metadata.id}
                            >
                                {metadata.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Card >
    )
}