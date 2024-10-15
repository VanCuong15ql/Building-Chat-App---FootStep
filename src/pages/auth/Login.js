import { Link as RouterLink} from "react-router-dom"
import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import AuthSocial from "../../sections/auth/AuthSocial"

const Login = () => {
  return (
    <>
    <Stack space={2} sx={{mb: 5, position: "relative"}}>
        <Typography variant="h4">Login to FootStep</Typography>
        <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">New User</Typography>
            <Link to="/auth/register" component={RouterLink} variant="subtitle2">
                Create an account
            </Link>
            {/* Login Form */}
            {/* Auth Social */}
            <AuthSocial/>
        </Stack>
    </Stack>
    </>
  )
}

export default Login
