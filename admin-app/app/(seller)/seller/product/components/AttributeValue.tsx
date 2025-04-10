import { Controller, useFieldArray } from "react-hook-form"

type AttributePropsType = {
  control: any,
  index: any,
  watch: any,
  availableValues: any,
  setValue: any
}

const AttributeValue = (
  {
    control,
    index,
    watch,
    availableValues,
    setValue
  }: AttributePropsType
) => {

  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `variation.attributes.${index}.attributeValues`,
  });
  
  const selectedValueIds = watch(`saleInfo.attributes.${index}.attributeValues`)?.map((v: any) => v.id) || [];
  const filterOptions = availableValues;
  return (
    <>
      {valueFields?.map((vField, vIndex) => {
        //const filteredOptions = availableValues.filter((v: any) => !selectedValueIds.includes(v.id) || v.id === vField.id);
        return (
          <div key={vField.id} className="flex gap-2">
            <Controller
              control={control}
              name={`saleInfo.attributes.${index}.attributeValues.${vIndex}.id`}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    const selectedId = parseInt(e.target.value);
                    const selected = availableValues.find((v: any) => v.id === selectedId);
                    field.onChange(selectedId);
                    console.log(selected);

                    setValue(`saleInfo.attributes.${index}.attributeValues.${vIndex}.valueName`, selected?.valueName || '');
                    setValue(`saleInfo.attributes.${index}.attributeValues.${vIndex}.id`, selectedId);
                  }}
                >
                  <option value="">-- Chọn giá trị --</option>
                  {filterOptions.map((val: any) => (
                    <option key={val.id} value={val.id}>{val?.valueName}</option>
                  ))}
                </select>
              )}
            />
            <button type="button" onClick={() => removeValue(vIndex)}>X</button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => appendValue({ id: '', valueName: '' })}
        disabled={availableValues.length === selectedValueIds.length}
      >
        + Thêm giá trị
      </button>

    </>
  )
}

export default AttributeValue;