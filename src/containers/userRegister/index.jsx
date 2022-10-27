// LIBs
import React, { useEffect, useState, useContext } from 'react';
import validator from 'validator';
import axios from "axios";
// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// UTILs
import * as Cookie from '../../core/utils/Cookie';

// CONTEXT
import { Context } from '../../core/contexts';

// STYLE
import './style.scss';

export function UserRegister() {
    const { state } = useContext(Context);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [valid, setValid] = useState(false);

    let textAlert = "Preencha corretamente o campo!";

    function setRegister() {

        if(name.length < 3) {
            setValidName(textAlert);
        } else {
            setValidName(false);
        }
        if(email.length < 11) {
            setValidEmail(textAlert);
        } else {
            if (validator.isEmail(email)) {
                setValidEmail(false);
            } else {
                setValidEmail("E-mail invalido");
            }
        }
        if (password.length < 8) {
            setValidPassword(textAlert+" Minimo de 08 dígitos");
        }

        if (name.length > 2 && email.length > 10 && password.length > 7) {
            setValidName(false);
            setValidPassword(false);
            setValid(false);
            if (validator.isEmail(email)) {
                setValidEmail(false);
                
                const config = {
                    headers: { Authorization: `Bearer ${Cookie.get('token')}` }
                };

                const bodyParameters = {name:name, email:email, password:password};

                axios.post(`${state._api}user`, bodyParameters, config)
                .then(function (response) {
                    if (!response.data.error) {
                        setValid("Cadastro realizado com sucesso");
                    } else {
                        setValidEmail(response.data.error.email[0]);
                        setValid(false);
                    }
                });
            } else {
                setValidEmail("E-mail invalido");
            }
        }
    }

    return (
        <section className={`user-register`}>
            {valid &&
                <Stack class="alert" sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">{valid}</Alert>
                </Stack>
            }
            <Box
                component="form"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                noValidate
                autoComplete="off"
                >
                <div className="inputs">
                    <TextField 
                        label="Nome" 
                        fullWidth 
                        onChange={(e)=>setName(e.target.value)} 
                        value={name.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())} 
                    />
                </div>
                {validName &&
                    <Stack class="alert" sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{validName}</Alert>
                    </Stack>
                }
                <div className="inputs">
                    <TextField 
                        label="E-mail" 
                        fullWidth 
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                    />
                </div>
                {validEmail &&
                    <Stack class="alert" sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{validEmail}</Alert>
                    </Stack>
                }
                <div className="inputs">
                    <TextField 
                        label="Senha" 
                        fullWidth 
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                    />
                </div>
                {validPassword &&
                    <Stack class="alert" sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">{validPassword}</Alert>
                    </Stack>
                }
                <Button variant="outlined" size="medium" onClick={setRegister}>
                    Salvar
                </Button>
            </Box>
        </section>
    )
}