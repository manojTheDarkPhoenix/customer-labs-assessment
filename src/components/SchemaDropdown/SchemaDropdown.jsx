import React, { useState } from 'react';
import { fieldsMaster } from "../SchemaFieldsData";
import './SchemaDropdown.css';

// Dropdown component - Common for both create and update fields
function Dropdown (props) {

    const {
        previousValue = false, // On adding select - false else truthy
        dropFields, // Other fields to show
        onSelect, // Executed onchange of select box
        onRemove // Removes current element & NA for field adding select box
    } = props;

    // Color : Green - User trait, Red - Group trait, Grey - Field Scheme adder
    const color = previousValue ? (previousValue.trait === 'user' ? 'green' : 'red') : 'grey';

    return (
        <div className="dropdown-container">
            <div>
                <span className="dot" style={{ backgroundColor : color }}></span>
            </div>
            <select className="select-field" onChange={(e) => onSelect(e.target.value,previousValue)}>
                {previousValue ? 
                    <option selected value={previousValue.value}>{previousValue.label}</option> 
                    : <option selected value = "">Add Schema to Segment</option>}
                {dropFields && dropFields.map((field) => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                ))}
            </select>
            <button className="field-remove-btn" type='button' onClick={onRemove}>&mdash;</button>
        </div>
    );
}

// All schema dropdowns and Logic
export default function SchemaDropdown () {

    const [schemaFields, setSchemaFields] = useState(fieldsMaster);
    const [addField, setAddField] = useState("");

    // Sets field as selected
    const setFieldSelected = (value) => {
        setSchemaFields(prevState => {
            return prevState.map(field => {
                if (field.value === value) {
                    return { ...field, isSelected: true };
                }
                return field;
            });
        });
    };

    // Sets field as unselected
    const setFieldUnselected = (value) => {
        setSchemaFields(prevState => {
            return prevState.map(field => {
                if (field.value === value) {
                    return { ...field, isSelected: false };
                }
                return field;
            });
        });        
    }

    // Updates the field to be added in blue box
    const updateAddField = (value, unused) => {
        setAddField(value);
    }

    // Adds the field to the blue box
    const handleAddField = () => {
        setFieldSelected(addField);
    }

    // Updates the updated field
    const updateAddedField = (currValue, prevValue) => {
        setFieldSelected(currValue);
        setFieldUnselected(prevValue.value);
    }
    // Removes added field
    const removeAddedField = (value) => {
        setFieldUnselected(value);
    }

    return (
        <>
            <div className="legend-container">
                <div>
                    <span className="dot" style={{ backgroundColor : "green" }}></span>
                    <span className="legend-field"> - User Traits</span>
                </div>
                <div>
                    <span className="dot" style={{ backgroundColor : "red" }}></span>
                    <span className="legend-field"> - Group Traits</span>
                </div>
            </div>            
            <div className = {schemaFields.filter((field) => field.isSelected).length > 0 ? 'blue-box' : ''}>
                {schemaFields.filter((field) => field.isSelected).map((selectedField) => {
                    return (
                        <Dropdown 
                            key={selectedField.value}
                            dropFields={schemaFields.filter((field) => !field.isSelected)} 
                            onSelect={updateAddedField} 
                            previousValue = {selectedField}
                            onRemove={() => removeAddedField(selectedField.value)} />
                    )
                })}
            </div>
            <Dropdown 
                dropFields={schemaFields.filter((field) => !field.isSelected)} 
                onSelect={updateAddField} 
                onRemove={() => console.log('cannot be removed')} />
            <div className='btn-add'>
                <a href='#' onClick={handleAddField}> + <span>Add new Schema</span></a>
            </div>
            <input type="hidden" name="schema" value={JSON.stringify(schemaFields
                .filter(field => field.isSelected)
                .map(({ value, label }) => ({ [value]: label })))} />
        </>
    );

}
