import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Компонент для отображения данных персоны
const PersonComponent = ({ person }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{person.name}</h3>
      <p>Возраст: {person.age}</p>
      <p>Email: {person.email}</p>
      <div>
        <h4>Питомцы:</h4>
        {person.pet.map((pet, index) => (
          <div key={index} style={{ marginLeft: '20px' }}>
            <p>Имя: {pet.name}</p>
            <p>Возраст: {pet.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Схема валидации для формы
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  age: Yup.number()
    .required('Обязательное поле')
    .positive('Возраст должен быть положительным')
    .integer('Возраст должен быть целым числом'),
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  pet: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Имя питомца обязательно'),
      age: Yup.number()
        .required('Возраст питомца обязателен')
        .positive('Возраст питомца должен быть положительным')
        .integer('Возраст питомца должен быть целым числом'),
    })
  ),
});

// Начальные значения формы
const initialValues = {
  name: '',
  age: '',
  email: '',
  pet: [{ name: '', age: '' }],
};

const App = () => {
  const [people, setPeople] = useState([]);

  const handleSubmit = (values, { resetForm }) => {
    // Преобразуем age в число
    const newPerson = {
      ...values,
      age: parseInt(values.age),
      pet: values.pet.map(pet => ({
        name: pet.name,
        age: parseInt(pet.age),
      })),
    };

    setPeople([...people, newPerson]);
    resetForm();
  };

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px', textDecoration: 'none' }}>
            Форма
          </Link>
          <Link to="/people" style={{ textDecoration: 'none' }}>
            Список людей
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Добавить человека</h2>
                <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ values, setFieldValue }) => (
    <Form>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name">Имя: </label>
        <Field type="text" id="name" name="name" />
        <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="age">Возраст: </label>
        <Field type="number" id="age" name="age" />
        <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email">Email: </label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
      </div>

      <h3>Питомцы</h3>
      {values.pet.map((pet, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor={`pet.${index}.name`}>Имя питомца: </label>
            <Field type="text" id={`pet.${index}.name`} name={`pet.${index}.name`} />
            <ErrorMessage
              name={`pet.${index}.name`}
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor={`pet.${index}.age`}>Возраст питомца: </label>
            <Field type="number" id={`pet.${index}.age`} name={`pet.${index}.age`} />
            <ErrorMessage
              name={`pet.${index}.age`}
              component="div"
              style={{ color: 'red' }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          values.pet.length < 3 &&
          setFieldValue('pet', [...values.pet, { name: '', age: '' }])
        }
        style={{ marginRight: '10px' }}
      >
        Добавить питомца
      </button>

      <button type="submit">Добавить человека</button>
    </Form>
  )}
</Formik>
              </div>
            }
          />

          <Route
            path="/people"
            element={
              <div>
                <h2>Список людей</h2>
                {people.length === 0 ? (
                  <p>Нет данных для отображения</p>
                ) : (
                  people.map((person, index) => (
                    <PersonComponent key={index} person={person} />
                  ))
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;