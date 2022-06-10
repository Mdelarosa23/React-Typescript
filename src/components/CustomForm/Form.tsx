import React, { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import { customForms } from '../../App';
import FormModel from '../../models/form';
import BaseService from '../../service/base.service';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Divider, List, ListItem, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import Paper from '@mui/material/Paper';
interface Props {
    customForm: customForms["forms"]
    setCustomForm: React.Dispatch<React.SetStateAction<Props["customForm"]>>
}

const Form: React.FC<Props> = ({ customForm, setCustomForm }) => {

    const [input, setInput] = useState({
        name: "",
        fields: [] as any,
        id: "",
    })

    const [inputFields, setInputFields] = useState({
        label: "",
        type: "",
    })


    // const fetchData = () => {

    //     BaseService.getAll<Person>("/person-list").then(
    //         (rp) => {
    //             setCustomForm([...rp.Data])
    //         }
    //     );
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    const handleClickFields = () => {
        input.fields.push(inputFields);
        console.log(input)
        // setInputFields({
        //     ...inputFields,
        // })

        setInputFields({
            label: "",
            type: "",
        })
        // const entries = Object.entries(inputFields);

        // setInput({
        //     ...input,
        //     fields: [...entries]
        // })
        // console.log(inputFields.label);
    }

    const handleClickSave = () => {
        console.log(input);
        // if (
        //     !input.name ||
        //     !input.fields
        // ) {


        //     return
        // }

        const setForm = {
            name: input.name,
            fields: input.fields,
        }
        BaseService.create<FormModel>("/form-create", setForm).then(
            (rp: any) => {
                console.log(rp);
                // fetchData()
            }
        );
        // setInput({
        //     name: "",
        //     fields: [],
        //     id: "",
        // })
    }

    const handleClickEditFields = (e: any) => {

        input.fields = input.fields.filter((field: any) => field.label !== e.label);
        setInputFields({
            label: e.label,
            type: e.type,
        })
    }
    const handleClickDeleteFields = (e: any) => {
        input.fields = input.fields.filter((field: any, key: any) => key !== e);
        setInputFields({
            label: "",
            type: "",
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFields({
            ...inputFields,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeType = (event: SelectChangeEvent) => {
        setInputFields({
            ...inputFields,
            [event.target.name]: event.target.value
        });
    };

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}  >
                    <Grid container mb={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Form Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    value={input.name} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <TextField
                                id="label"
                                name="label"
                                label="Label"
                                variant="outlined"
                                size="small"
                                onChange={handleChangeFields}
                                value={inputFields.label} />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    name="type" autoWidth
                                    value={inputFields.type}
                                    label="Type"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChangeType}
                                >
                                    <MenuItem value="Textbox">Textbox</MenuItem>
                                    <MenuItem value="Number">Number</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                <Button variant="contained" onClick={handleClickFields}>Add</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}  >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Label</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {input.fields.map((row: any, key: any) => (
                                    <TableRow
                                        key={key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell align="right">
                                            <Stack spacing={2} direction="row" justifyContent="flex-end">
                                                <Button variant="contained" onClick={() => handleClickEditFields(row)}>Edit</Button>
                                                <Button variant="contained" color="error" onClick={() => handleClickDeleteFields(key)}>Delete</Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleClickSave}>Submit</Button>
                </Grid>
            </Grid>

        </div >
    )
}

export default Form