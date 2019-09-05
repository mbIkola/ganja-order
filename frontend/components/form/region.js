import React from 'react';
import {ErrorMessage, FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {RegionDropdown} from "react-country-region-selector";

const RegionInput = ({className, label, type, name, placeholder, required, value, handleChange, handleBlur, ...other}) => (
    <Label className={className}>
        {label}
        <RegionDropdown style={{width: '100%'}} className="bp3-input" type={type} name={name} placeholder={placeholder} required={required} value={value}
                   onChange={(v,evt) => { handleChange(evt);}} onBlur={handleBlur} {...other}
        />
        <ErrorMessage name={name} component="div"/>
    </Label>
);


RegionInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool.isRequired
};

export default RegionInput;
