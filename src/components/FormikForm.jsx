import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

// Самостоятельная валидация.

// const validate = (values) => {
//   const errors = {};

//   if (!values.name) {
//     errors.name = 'Обязательное поле!';
//   } else if (values.name.length < 2) {
//     errors.name = 'Минимум 2 символа для заполнения!';
//   }

//   if (!values.email) {
//     errors.email = 'Обязательное поле!';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Неправильный email адрес';
//   }

//   return errors;
// };

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // useField позволяет получать массив из двух объектов,
  // FIELD - это просы, то что мы передаем ниже в input(события - onChange, onBlur, value),
  // которые отвечают за текущее состояние нашего инпута, все эти значения будут получаться через context из Formik.
  // META - это метаданные с ошибками и был ли уже использован этот инпут.
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const FormikForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Минимум 2 символа!')
          .required('Обязательное поле!'),
        email: Yup.string()
          .email('Неправильный email адрес')
          .required('Обязательное поле!'),
        amount: Yup.number()
          .min(3, 'Не менее 3')
          .required('Обязательное поле!'),
        currency: Yup.string().required('Выберите валюту'),
        text: Yup.string().min(5, 'Не менее 5 символов'),
        terms: Yup.boolean()
          .required('Необходимо согласие!')
          .oneOf([true], 'Необходимо согласие!'),
      })}
      // Трансформация объекта в строку.
      onSubmit={(value) => console.log(JSON.stringify(value, null, 2))}
    >
      <Form className="form">
        <h2>Отправить пожертвование</h2>
        {/* Старая запись, заменили на MyTextInput, что бы не было дублирование кода. */}
        {/* <label htmlFor="name">Ваше имя</label>
        <Field
          id="name"
          name="name"
          type="text"
          //Использует context, 3 поля ниже получит автоматически.
          // onChange={formik.handleChange}
          // value={formik.values.name}
          // onBlur={formik.handleBlur}
        />
        <ErrorMessage name="name" className="error" component={'div'} /> */}
        <MyTextInput
          label="Ваше имя"
          id="name"
          name="name"
          type="text"
        />
        <MyTextInput
          label="Ваша почта"
          id="email"
          name="email"
          type="email"
        />
        <label htmlFor="amount">Количество</label>
        <Field
          id="amount"
          name="amount"
          type="number"
        />
        <ErrorMessage name="amount" className="error" component={'div'} />
        <label htmlFor="currency">Валюта</label>
        <Field
          as="select"
          id="currency"
          name="currency"
        >
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage name="currency" className="error" component={'div'} />
        <label htmlFor="text">Ваше сообщение</label>
        <Field
          as="textarea"
          id="text"
          name="text"
        />
        <ErrorMessage name="text" className="error" component={'div'} />
        <label className="checkbox">
          <Field 
            name="terms"
            type="checkbox"
          />
          Соглашаетесь с политикой конфиденциальности?
        </label>
        <ErrorMessage name="terms" className="error" component={'div'} />
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default FormikForm;
