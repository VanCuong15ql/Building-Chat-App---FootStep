
import { Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const Verify = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography>Please Verify OTP</Typography>

                <Stack>
                    <Typography>
                        Sent to email (vancuong@gmail.com)
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
}

export default Verify