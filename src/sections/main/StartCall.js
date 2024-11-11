import { Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { MembersList } from '../../data';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
    return (
        <Dialog fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{ p: 4 }}
            onClose={handleClose}
        >
            {/* Title */}
            <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
            {/* Content */}
            <DialogContent>
                <Stack spacing={3}>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Stack>
                    {/* Call list */}
                    {MembersList.map((el) => <CallElement {...el} />)}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default StartCall;
