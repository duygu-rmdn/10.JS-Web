import { useState } from "react"

export const useForm = (initilaValues, onSubmitHandler) => {
    const [formValues, setFormValues] = useState(initilaValues);

    const onChangeHandler = (e) => {
        setFormValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (onSubmitHandler) {
            onSubmitHandler(formValues);
        }
    };

    return {formValues, onChangeHandler, onSubmit};
};