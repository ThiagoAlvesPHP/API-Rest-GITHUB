// LIBs
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Icons
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

// COMPONENTS
import { BtnAction } from '../../components/BtnAction';
// UTILs
import * as Cookie from '../../core/utils/Cookie';
// CONTEXT
import { Context } from '../../core/contexts';
// STYLE
import './style.scss';

export function UserList() {
    const { state } = useContext(Context);
    const [rows, setRows] = useState([]);

    function createData(
        action,
        name,
        email,
        status
    ) {
        return { action, name, email, status };
    }

    function del(id) {
        console.log(id);
    }

    useEffect(() => {

    const config = {
        headers: { Authorization: `Bearer ${Cookie.get('token')}` }
    };

    axios.get(`${state._api}user/list`, config)
    .then(function (response) {
        let array = [];
        response.data.list.map((el, key) => {
            array.push(createData(
                <div className='links'>
                    <BtnAction title={`Editar`} class={`edit`} link={`../user-update/${el.id}`} icon={AiFillEdit} />

                    {/* <BtnAction identify={el.id} del={del} title={`Deletar`} class={`delete`} link={`../user-list`} icon={AiTwotoneDelete} /> */}
                </div>, 
                el.name, 
                el.email, 
                (el.status == 1)?"Ativo":"Inativo"
            ));
        });
        setRows(array);
    });
    }, []);

    return (
        <section className={`user-list`}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Ação</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">E-mail</TableCell>
                        <TableCell align="left">Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className='action' component="th" scope="row">
                                {row.action}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}