import { useFormik } from 'formik';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Обязательное поле!';
  } else if (values.name.length < 2) {
    errors.name = 'Минимум 2 символа для заполнения!';
  }

  if (!values.email) {
    errors.email = 'Обязательное поле!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неправильный  email адрес';
  }

  return errors;
};

const UseFormikForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      amount: 0,
      currency: '',
      text: '',
      terms: false,
    },
    validate,
    onSubmit: (value) => console.log(JSON.stringify(value, null, 2)),
    // Трансформация объекта в строку.
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
      <label htmlFor="email">Ваша почта</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="amount">Количество</label>
      <input
        id="amount"
        name="amount"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.amount}
        onBlur={formik.handleBlur}
      />
      <label htmlFor="currency">Валюта</label>
      <select
        id="currency"
        name="currency"
        onChange={formik.handleChange}
        value={formik.values.currency}
        onBlur={formik.handleBlur}
      >
        <option value="">Выберите валюту</option>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="RUB">RUB</option>
      </select>
      <label htmlFor="text">Ваше сообщение</label>
      <textarea
        id="text"
        name="text"
        onChange={formik.handleChange}
        value={formik.values.text}
        onBlur={formik.handleBlur}
      />
      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          onChange={formik.handleChange}
          value={formik.values.terms}
          onBlur={formik.handleBlur}
        />
        Соглашаетесь с политикой конфиденциальности?
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default UseFormikForm;
