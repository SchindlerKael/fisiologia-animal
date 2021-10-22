import { useContext } from 'react';
import { OptionListContext } from "../store/optionList.context";

export function useOptionList() {
  const context = useContext(OptionListContext);
  const {options, setOptions} = context;
  return {options, setOptions};
}

export function useResult() {
  const context = useContext(OptionListContext);
  const {options} = context;

  if(options) {
    return options
      .filter(option => option.experiment_options.correct_answer)
      .map(option => option.experiment_options.weight);
  }
}

export function useAnswer() {
  const context = useContext(OptionListContext);
  const {options} = context;

  if(options) {
    return options
      .filter(option => option.used)
      .map(option => option.experiment_options.weight);
  }
}
  