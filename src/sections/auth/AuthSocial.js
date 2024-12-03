import { Divider, IconButton, Stack} from '@mui/material'
import { GithubLogo, GoogleLogo, TwitchLogo } from 'phosphor-react'
import React from 'react'

const AuthSocial = () => {
    return (
        <div>
            <Divider 
            sx={{my: 2.5, typography: "overline", color: "text.disabled", "&::before,::after": { borderTopStyle: "dashed", },}}
            >
            Slogan
            </Divider>
            <Stack direction={"row"} justifyContent={"center"} spacing={2}>
                {/* <IconButton>
                    <GoogleLogo color="#f00"></GoogleLogo>
                </IconButton>
                <IconButton color="inherit">
                    <GithubLogo></GithubLogo>
                </IconButton>
                <IconButton>
                    <TwitchLogo color="#1C9CEA"/>
                </IconButton> */}
                Dấu chân nhỏ, câu chuyện lớn
            </Stack>
        </div>
    )
}

export default AuthSocial
