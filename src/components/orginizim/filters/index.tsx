import { options } from '../../../pages/product/constant';
import MultiSelect from '../../basic/ktnMultiSelect';
import Select from '../../basic/ktnSelect';
import RadioButton from '../../basic/ktnRadioGroup';
import InputText from '../../basic/ktnTextInputWithCover';
import Button from '../../basic/ktnButton';

const Filters = ({
  cities,
  setMultiselectValue,
  multiselectValue,
  selectValue,
  setSelectValue,
  textValue,
  setTextValue,
  radioValue,
  setRadioValue,
}: any) => {
  return (
    <div className="p-input-filled">
      <div className="grid p-fluid mt-5">
        <MultiSelect
          parentClasses="field col-12 md:col-3"
          id="multiselect"
          options={cities}
          value={multiselectValue}
          onChange={(e: any) => setMultiselectValue(e.value)}
          optionLabel="name"
          label={'MultiSelect'}
        />
        <Select
          parentClasses="field col-12 md:col-3"
          id="select"
          options={cities}
          value={selectValue}
          onChange={(e: any) => setSelectValue(e.value)}
          label={'Select'}
          optionLabel="name"
        />
        <InputText
          parentClasses="field col-12 md:col-3"
          id="text"
          value={textValue}
          onChange={(e: any) => setTextValue(e.value)}
          label={'Text'}
        />
        <div className="field col-12 md:col-1">
          <Button
            label="filter"
            icon="pi pi-filter"
            className="p-button-success mr-2 mb-2"
          />
        </div>

        <RadioButton
          options={options}
          parentClasses="field col-12 md:col-12"
          onChange={(e: any) => setRadioValue(e.value)}
          value={radioValue}
        />
      </div>
    </div>
  );
};
export default Filters;
