import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import { useMetadataStore } from '@/stores/MetadataStore';
import { useCreateJobStore } from '@/stores';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale';

export const RequirementCard: React.FC = () => {
    const metadataStore = useMetadataStore();
    const createJobStore = useCreateJobStore();
    const [noAgeRequired, setNoAgeRequired] = React.useState(false);

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        createJobStore.setGenderRequirementId(event.target.value);
    };

    const handleMinAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        createJobStore.setMinAgeRequirement(value === '' ? null : parseInt(value, 10));
    };

    const handleMaxAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        createJobStore.setMaxAgeRequirement(value === '' ? null : parseInt(value, 10));
    };

    const handleAgeRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoAgeRequired(e.target.checked);
        createJobStore.setMinAgeRequirement(null);
        createJobStore.setMaxAgeRequirement(null);
    };

    const handleEducationLevelChange = (event: SelectChangeEvent<string>) => {
        createJobStore.setEducationLevelRequirementId(event.target.value);
    };

    const handleWorkExperienceChange = (event: SelectChangeEvent<string>) => {
        createJobStore.setWorkExperienceRequirementId(event.target.value);
    };

    const handleSkillChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
        createJobStore.setSkills(newValue);
    };

    const handleSkillDelete = (indexToDelete: number) => {
        const updatedSkills = createJobStore.jobData.skills.filter((_, index) => index !== indexToDelete);
        createJobStore.setSkills(updatedSkills);
    };

    const handleDateChange = (newDate: Date | null) => {
        if (newDate) {
            createJobStore.setCloseDate(newDate);
        }
    };

    React.useEffect(() => {
        console.log(createJobStore.jobData.closeDate);
    }, [createJobStore.jobData.closeDate])


    React.useEffect(() => {
        console.log(createJobStore.jobData.skills);
    }, [createJobStore.jobData.skills]);

    React.useEffect(() => {
        const fetchGender = async () => {
            await metadataStore.loadMetadataByGender();
        };
        const fetchEducationLevel = async () => {
            await metadataStore.loadMetadataByEducationLevel();
        }
        const fetchWorkArrangement = async () => {
            await metadataStore.loadMetadataByWorkExperience();
        }

        fetchGender();
        fetchEducationLevel();
        fetchWorkArrangement();
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
                    Yêu cầu công việc
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
                <Box>
                    <Typography
                        className='font-semibold font-sans text-base pl-2 pt-2'
                    >
                        Giới tính
                    </Typography>

                    <FormControl>
                        {metadataStore.listGender.length > 0 && (
                            <RadioGroup
                                row
                                className="pl-2"
                                value={createJobStore.jobData.genderRequirement.id}
                                onChange={handleGenderChange}
                            >
                                {metadataStore.listGender.map((gender) => (
                                    <FormControlLabel
                                        key={gender.id}
                                        value={gender.id}
                                        control={<Radio />}
                                        label={<span className="text-sm">{gender.value}</span>}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    </FormControl>
                </Box>

                <Box>
                    <Typography
                        className='font-semibold font-sans text-base pl-2 pt-2 pb-2'
                    >
                        Tuổi
                    </Typography>

                    <Box className="mr-1">
                        <Typography className="text-sm font-sans pl-2 pb-1">
                            Tối thiểu
                        </Typography>
                        <TextField
                            id="min-age"
                            size="small"
                            variant="outlined"
                            placeholder="Tuổi"
                            className="pl-2 min-w-40 pb-2"
                            value={createJobStore.jobData.minAgeRequirement ?? ''}
                            onChange={handleMinAgeChange}
                            disabled={noAgeRequired}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography className="text-sm font-sans pl-2 pb-1">
                            Tối đa
                        </Typography>
                        <TextField
                            id="max-age"
                            size="small"
                            variant="outlined"
                            placeholder="Tuổi"
                            className="pl-2 min-w-40 pb-2"
                            value={createJobStore.jobData.maxAgeRequirement ?? ''}
                            onChange={handleMaxAgeChange}
                            disabled={noAgeRequired}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
                        />
                    </Box>
                    <FormControlLabel
                        className="pl-2 pb-4"
                        control={
                            <Checkbox
                                checked={noAgeRequired}
                                onChange={handleAgeRequiredChange}
                            />
                        }
                        label="Không yêu cầu độ tuổi"
                    />
                </Box>

                <Box>
                    <Typography
                        className='text-sm font-sans pl-2 pb-4'
                    >
                        Kỹ năng yêu cầu
                    </Typography>

                    <Autocomplete
                        multiple
                        freeSolo
                        options={[]}
                        className="w-96 pl-2"
                        value={createJobStore.jobData.skills}
                        onChange={handleSkillChange}
                        renderTags={(value: string[], getTagProps) =>
                            value.map((option: string, index: number) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                    <Chip
                                        key={key}
                                        label={option}
                                        {...tagProps}
                                        onDelete={() => handleSkillDelete(index)}
                                        size="small"
                                    />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tìm kỹ năng"
                                size="small"
                                className="text-sm pb-4"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />

                </Box>

                <Box>
                    <Typography
                        className='text-sm font-sans pl-2 pb-1'
                    >
                        Yêu cầu trình độ học vấn tối thiểu
                    </Typography>

                    <FormControl
                        size="small"
                        className="pl-2 mt-1 min-w-64 pb-4"
                    >
                        <InputLabel
                            id="education-label"
                            className="text-sm"
                        >Trình độ học vấn</InputLabel>
                        <Select
                            labelId="education-label"
                            id="education-label"
                            label="Trình độ học vấn"
                            value={createJobStore.jobData.educationLevelRequirement.id || ''}
                            onChange={handleEducationLevelChange}
                        >
                            <MenuItem disabled value="">
                                <em>Tất cả loại hình</em>
                            </MenuItem>
                            {metadataStore.listEducationLevel.length > 0 && metadataStore.listEducationLevel.map((metadata) => (
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

                <Box>
                    <Typography
                        className='text-sm font-sans pl-2 pb-1'
                    >
                        Yêu cầu kinh nghiệm
                    </Typography>

                    <FormControl
                        size="small"
                        className="pl-2 mt-1 min-w-64 pb-4"
                    >
                        <InputLabel
                            id="demo-simple-select-label"
                            className="text-sm"
                        >Kinh nghiệm</InputLabel>
                        <Select
                            labelId="experience-label"
                            id="experience-label"
                            label="Kinh nghiệm"
                            value={createJobStore.jobData.workExperienceRequirement.id || ''}
                            onChange={handleWorkExperienceChange}
                        >
                            <MenuItem disabled value="">
                                <em>Tất cả loại hình</em>
                            </MenuItem>
                            {metadataStore.listWorkExperience.length > 0 && metadataStore.listWorkExperience.map((metadata) => (
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
                <Box>
                    <Typography className='text-sm font-sans pl-2 pb-4'>
                        Ngày đóng
                    </Typography>

                    <Box
                        className="pl-2 pb-2"
                    >
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            adapterLocale={enGB}>
                            <DatePicker
                                label="Chọn ngày"
                                value={createJobStore.jobData.closeDate}
                                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                disablePast
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}