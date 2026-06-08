import React, {useState} from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as S from './styled';



const InputField2 = ({ label, type, value, onChange, children}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <S.Container>
            <S.Input
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                value={value}
                onChange={onChange}
            />
            <S.Label>{label}</S.Label>
            <S.ToggleButton
                aria-label="toggle password visibility"
                type="button"
                onClick={handleClickShowPassword}
            >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </S.ToggleButton>
        </S.Container>
    )
}

export default InputField2
