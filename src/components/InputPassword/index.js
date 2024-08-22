import React, {useState} from 'react'
// import { InputFieldProps } from '../../types/propTypes'
// import {
//     Container,
//     Input,
//     Label
// } from './InputFieldElements'
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


import * as S from './styled';



const InputField2 = ({ label, type, value, onChange, children}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <S.Container>
            {/* <S.Input type={type} placeholder=" " inputMode={type=='numeric' ? 'numeric' : ''} value={value} onChange={onChange} > */}

            <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" sx={{
                    color: 'grey', // Default color
                    '&.Mui-focused': {
                        color: 'black', // Color when focused
                    },
                    '&.MuiFormLabel-filled': {
                        color: 'black', // Color when input is filled
                    }
                }}>{label}</InputLabel>

                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                //   onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label +'123'}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'grey', // Change this to your desired color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'red', // Change color on hover
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'black', // Change color when focused
                        },
                      }}
                />
            </FormControl>
        </S.Container>
    )
}

export default InputField2