import { useState } from 'react';

// support form logic
export const useForm = (options) => {
    const [data, setData] = useState(options?.initialValues || {}); // form data
    const [errors, setErrors] = useState({}); // throwing error (validation)

    // input event handling (typing)
    const handleChange = (key, sanitizeFn) => (e) => {
        // key — form attribute for managing
        // sanitizeFn — optional handler (for example, transfer int to str)
        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
        // change data of certain key (form item) in state {}
        setData({
            ...data,
            [key]: value,
        });
    };

    // sending completed form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validations = options?.validations;
        // check whether validators specified
        if (validations) {
            let valid = true; // default validator state (good)
            const newErrors = {}; // default errors
            // for each key check validators
            for (const key in validations) {
                const value = data[key]; // get key value
                const validation = validations[key]; // get key validators
                // CHECK REQUIRED
                if (validation?.required?.value && !value) {
                    valid = false; // validator rule is failed
                    newErrors[key] = validation?.required?.message; // add error msg to erros obj
                    // regexp and custom have equal logic (below)
                }
                // CHECK REGEXP
                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }
                // CHECK CUSTOM VALIDATORS
                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false;
                    newErrors[key] = custom.message;
                }
            }

            // if some validation rules failed -> update errors state
            if (!valid) {
                setErrors(newErrors);
                return;
            }
        }

        setErrors({}); // make errors state empty (there aren't validators)

        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
    };
};
