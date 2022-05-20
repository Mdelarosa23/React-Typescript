import React, { useState } from 'react';
import {
    registration as Props,
    formRegistration as form,
} from '../App';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { stringify } from 'querystring';

import Person from '../models/person';
import BaseService from '../service/base.service';

// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'first_name', headerName: 'First name', width: 130 },
//     { field: 'last_name', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
// ];

interface IIProps {
    people: Props["people"]
    form: form
    setForm: React.Dispatch<React.SetStateAction<form>>
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>

}


const List: React.FC<IIProps> = ({ people, form, setForm, setPeople }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editPeople, setEditPeople] = useState<number>();

    const [input, setInput] = useState({
        first_name: "",
        last_name: "",
        age: 0,
        id: "",
    })


    const cancelEdit = (e: any) => {
        setEdit(false);
    }
    const deletePeople = (e: any) => {

        BaseService.delete("/person-delete/", e).then(
            (rp) => {

                fetchData()
            }
        );

    }
    const fetchData = () => {

        BaseService.getAll<Person>("/person-list").then(
            (rp) => {
                setPeople([...rp.Data])
                setEdit(false);
            }
        );

    }

    const updatePeople = (e: any) => {
        const person = {
            first_name: input.first_name,
            last_name: input.last_name,
            age: input.age
        }

        BaseService.update<Person>("/person-update/", input.id, person).then(
            (rp) => {

                fetchData()
            }
        );
    }

    const peopleEdit = (e: any) => {

        setEdit(true);
        setEditPeople(e);


        const peeps = people.find((peeps) => peeps.id === e);
        input.first_name = peeps?.first_name!;
        input.last_name = peeps?.last_name!;
        input.age = peeps?.age!;
        input.id = e;
        // setInput();
        // console.log(edit);
        // setForm({
        //     id: e.id,
        //     first_name: e.first_name,
        //     last_name: e.last_name,
        //     age: e.age
        // })
        // console.log('form');
        // console.log(form);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return (
        // <div style={{ height: 400, width: '100%' }}>
        //     <DataGrid
        //         rows={people}
        //         columns={columns}
        //         pageSize={5}
        //         rowsPerPageOptions={[5]}
        //         checkboxSelection
        //     />

        // </div>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>age</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {people.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {edit && editPeople === row.id ?
                                    <TextField onChange={handleChange} name="first_name" id="first_name" size="small" variant="filled" value={input.first_name} /> :
                                    row.first_name}
                            </TableCell>
                            <TableCell>
                                {edit && editPeople === row.id ? <TextField onChange={handleChange} name="last_name" id="last_name" size="small" variant="filled" value={input.last_name} /> : row.last_name}
                            </TableCell>
                            <TableCell>
                                {edit && editPeople === row.id ? <TextField onChange={handleChange} name="age" id="age" size="small" variant="filled" value={input.age} /> : row.age}
                            </TableCell>
                            <TableCell align="right">
                                <Stack spacing={2} direction="row" justifyContent="flex-end">
                                    {edit && editPeople === row.id ? <Button variant="contained" startIcon={<EditIcon />} onClick={() => updatePeople(row.id)}>Save</Button> : ''}
                                    {edit && editPeople === row.id ?
                                        <Button variant="contained" startIcon={<EditIcon />} color="error" onClick={() => cancelEdit(row.id)}>Cancel</Button>
                                        : <Button variant="contained" startIcon={<EditIcon />} onClick={() => peopleEdit(row.id)}>Edit</Button>
                                    }
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deletePeople(row.id)}>Delete</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default List