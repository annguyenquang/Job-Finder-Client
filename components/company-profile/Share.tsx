import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';


export const Share: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [currentUrl, setCurrentUrl] = React.useState<string>('');

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(currentUrl);
            setOpen(true); // Hiển thị thông báo

        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            className="flex flex-col">
            <Box
                className="bg-colorPrimary">
                <Typography
                    variant="h6"
                    className="font-medium p-3 text-white"
                >Chia sẻ công ty tới bạn bè</Typography>
            </Box>
            <CardContent>
                <Box
                    className='flex flex-row mb-2'>
                    <ShareIcon
                        className='mr-2 text-colorPrimary'
                        fontSize='medium'
                    ></ShareIcon>
                    <Typography
                        className=''
                        variant='body1'
                    >Sao chép đường dẫn</Typography>
                </Box>
                <Box className="flex items-center mt-4">
                    <TextField
                        className='max-w-96 mr-2'
                        size='small'
                        id="outlined-basic"
                        label={currentUrl || 'Đang tải...'}
                        disabled
                        fullWidth
                        variant="outlined"
                    />
                    <IconButton onClick={handleCopy}>
                        <ContentCopyIcon fontSize='small' />
                    </IconButton>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ backgroundColor: '#4caf50', color: '#fff' }} // Chỉnh màu ở đây
                        >
                            Sao chép thành công
                        </Alert>
                    </Snackbar>

                </Box>
            </CardContent>
        </Card>
    );
}
