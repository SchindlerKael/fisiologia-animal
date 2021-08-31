import React, {useState} from 'react'

import Button from "../../components/Button/index";

import {useDropDown, useOptionList} from '../../hooks/optionList.hook';

import "./styles.css";

const OptionGroup = (props) => {

  const [{ dropdown, dropdownRef }, toggleDropdown] = useDropDown();

  const {options, setOptions} = useOptionList();

  const [selectedOption, setSelectedOption] = useState(null);

  const UpdateList  = (i) => {
    let rows = options;
    if(selectedOption != null)
      rows[selectedOption].used = !rows[selectedOption].used;

    rows[i].used = !rows[i].used;
    setOptions(rows);
    setSelectedOption(i);
  }

  return (

    <div className="option">
      <div className="option-header">
        <Button label={props.label} onClick={toggleDropdown} />
        <label>{selectedOption != null && options[selectedOption].name}</label>
      </div>
        
      <div ref={dropdownRef} className={`${dropdown} options-list`}>       
        <ul>
          {options.map((option, i) => {
            return(
              <li className={option.used ? "hide" : ""}> 
                <label for={`${props.id}-${i}`} onClick={() => UpdateList(i)}>{option.name}</label>
                <input 
                  type="radio" 
                  id={`${props.id}-${i}`} 
                  name={props.id} 
                  value={option.value}
                  onChange={props.handleChange}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>       
  )
}


export default OptionGroup