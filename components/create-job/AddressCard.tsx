import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useMetadataStore } from '@/stores/MetadataStore';
import { useCreateJobStore, useLocationStore } from '@/stores';
import { District, LocationService, Province } from '@/services';

export const AddressCard: React.FC = () => {
    const metadataStore = useMetadataStore();
    const createJobStore = useCreateJobStore();
    const locationStore = useLocationStore();
    const [listDistrict, setListDistrict] = React.useState<District[] | undefined>([]);
    const [inputDistrictText, setInputDistrictText] = React.useState('');

    const handleArrangementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        createJobStore.setWorkArrangementId(event.target.value);
    };

    React.useEffect(() => {
        console.log("workArrangement jobStore: ", createJobStore.jobData.workArrangement)
    }, [createJobStore.jobData.workArrangement])

    const handleProvinceChange = (event: React.SyntheticEvent, newValue: Province | string | null) => {
        const code = (newValue as Province)?.code;
        setListDistrict([]);
        setInputDistrictText('');
        createJobStore.setDistrictId(0);
        createJobStore.setProvinceId(code);
    };

    const handleDistrictChange = (event: React.SyntheticEvent, newValue: District | string | null) => {
        const code = (newValue as District)?.code;
        createJobStore.setDistrictId(code);
    };

    React.useEffect(() => {
        console.log("provinceId jobStore: ", createJobStore.jobData.provinceId)
    }, [createJobStore.jobData.provinceId])

    React.useEffect(() => {
        console.log("districtId jobStore: ", createJobStore.jobData.districtId)
    }, [createJobStore.jobData.districtId])

    React.useEffect(() => {
        const fetchWorkArrangement = async () => {
            await metadataStore.loadMetadataByWorkArrangement();
        };
        const fetchAllProvince = async () => {
            await locationStore.loadAllProvince();
        };

        fetchWorkArrangement();
        fetchAllProvince();
    }, []);

    React.useEffect(() => {
        if (createJobStore.jobData.provinceId) {
            const fetchAllDistrict = async (selectedProvinceId: number) => {
                const listDistrict = await LocationService.getDistrictsByProvinceId(selectedProvinceId);
                setListDistrict(listDistrict);
            };
            fetchAllDistrict(createJobStore.jobData.provinceId);
        }
    }, [createJobStore.jobData.provinceId])

    return (
        <Card
            className="mb-4"
        >
            <Box
                className="p-2 flex-row flex">
                <Typography
                    className='font-semibold font-sans text-lg pl-2 pt-2 pb-2'
                >
                    Địa điểm làm việc
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
                    className='font-semibold font-sans text-base pl-2 pt-2'
                >
                    Hình thức làm việc
                </Typography>

                <FormControl>
                    <RadioGroup
                        row
                        className="pl-2"
                        value={createJobStore.jobData.workArrangement.id}
                        onChange={handleArrangementChange}
                    >
                        {metadataStore.listWorkArrangement.length > 0 && metadataStore.listWorkArrangement.map((workArrangement) => (
                            <FormControlLabel
                                key={workArrangement.id}
                                value={workArrangement.id}
                                control={<Radio />}
                                label={<span className="text-sm">{workArrangement.value}</span>}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Typography
                    className='font-semibold font-sans text-base pl-2 pt-2 pb-4'
                >
                    Địa điểm làm việc
                </Typography>


                <Box
                    className="flex flex-row"
                >
                    {
                        locationStore.allProvince &&
                        <Autocomplete
                            freeSolo
                            options={locationStore.allProvince}
                            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
                            isOptionEqualToValue={(option, value) => option.code === (value as Province)?.code}
                            className="w-60 pl-2 mr-1"
                            value={locationStore.allProvince.find((province) => province.code === createJobStore.jobData.provinceId)}
                            onChange={handleProvinceChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tỉnh/Thành phố"
                                    size="small"
                                    className="text-sm pb-4"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    }

                    {
                        listDistrict &&
                        <Autocomplete
                            freeSolo
                            options={listDistrict}
                            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
                            isOptionEqualToValue={(option, value) => option.code === (value as District)?.code}
                            className="w-60 pl-2 mr-1"
                            value={listDistrict.find((district) => district.code === createJobStore.jobData.districtId)}
                            inputValue={inputDistrictText}
                            onInputChange={(event, newInputValue) => setInputDistrictText(newInputValue)}
                            onChange={handleDistrictChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Quận/Huyện"
                                    size="small"
                                    className="text-sm pb-4"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    }
                </Box>
            </Box>
        </Card>
    )
}