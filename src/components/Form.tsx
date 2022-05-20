import React, { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import { registration as Props } from '../App';
import Person from '../models/person';
import BaseService from '../service/base.service';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface IProps {
    people: Props["people"]
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>
}

const Form: React.FC<IProps> = ({ people, setPeople }) => {

    const [input, setInput] = useState({
        first_name: "",
        last_name: "",
        age: "",
        id: "",
    })


    const fetchData = () => {

        BaseService.getAll<Person>("/person-list").then(
            (rp) => {
                setPeople([...rp.Data])
            }
        );
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = () => {
        if (
            !input.first_name ||
            !input.last_name ||
            !input.age
        ) {


            return
        }

        const person = {
            first_name: input.first_name,
            last_name: input.last_name,
            age: parseInt(input.age)
        }
        BaseService.create<Person>("/person-create", person).then(
            (rp) => {
                fetchData()
            }
        );
        setInput({
            first_name: "",
            last_name: "",
            age: "",
            id: "",
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Grid mb={2} mt={2} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <TextField
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={input.first_name} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={input.last_name} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    type="number"
                    id="age"
                    name="age"
                    label="Age"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={input.age} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleClick}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default Form