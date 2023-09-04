import { useState, ChangeEvent } from 'react';

export const useForm = <T>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target;
    setForm({
      ...form,
      [id]: value
    });
  };

  const onSelectChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = target;
    setForm({
      ...form,
      [id]: value
    });
  };

  const onResetForm = () => {
    setForm(initialForm);
  };

  return {
    ...form,
    form: form as T,
    onInputChange,
    onSelectChange,
    onResetForm
  };
};
