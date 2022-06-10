import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import Person from './models/person';
import BaseService from './service/base.service';

import CustomForm from './components/CustomForm/Form';


import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export interface registration {
  people: {
    id?: number,
    first_name: string,
    last_name: string,
    age: number
  }[]
}

export interface forms {
  people: {
    id?: number,
    name: string,
  }[]
}

export interface formRegistration {
  id?: number,
  first_name: string,
  last_name: string,
  age?: number
}

export interface customForms {
  forms: {
    id?: number,
    name: string,
    fields: []
  }[]

}

function App() {




  const [people, setPeople] = useState<registration["people"]>([]);
  const [customForm, setCustomForm] = useState<customForms["forms"]>([]);
  const [form, setForm] = useState<formRegistration>({ id: 0, first_name: '', last_name: '', age: 0 });
  // let form = {
  //   first_name: 'ss',
  //   last_name: '',
  //   age: undefined
  // }
  // const updatePeople = (name: string): void => {
  //   setParentName(name)
  // }

  // const updatePeople = (e: any) => {
  //   console.log(e)

  //   editPeople = e;
  // };

  // toggleState = {(e, title) => toggleState(e, title)

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

  return (
    <div className="App">

      <CssBaseline />
      <Container maxWidth="lg">

        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}


        <Form people={people} setPeople={setPeople} />
        <List people={people} setPeople={setPeople} form={form} setForm={setForm} />

        <hr />
        <CustomForm customForm={customForm} setCustomForm={setCustomForm} />
      </Container>

    </div>
  );
}

export default App;
