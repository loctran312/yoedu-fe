import { useAppSelector } from '@/app/redux/hooks';
import { Col, Form } from 'antd';
import { type FormModalModeType } from '@/shared/types/form-modal-mode-type';
import RowCustom from '../row/RowCustom';
import InputCustom from '../input/InputCustom';
import UploadImageCustom from '../upload/UploadImageCustom';
import InputNumberCustom from '../input/InputNumberCustom';
import InputPasswordCustom from '../input/InputPasswordCustom';
import SelectCustom from '../select/SelectCustom';
import SelectFetchCustom from '../select/SelectFetchCustom';
import TimePickerCustom from '../timepicker/TimePickerCustom';
import DatePickerCustom from '../datepicker/DatePickerCustom';
import InputTextAreaCustom from '../input/InputTextAreaCustom';
import { FormFieldType } from '@/shared/types/form-field-type';
import type { UserRole } from '@/features/users/types/user-role-type';
import type { FormField } from '../modal/ModalFormCustom';

interface DynamicFormProps<T> {
  fields: FormField<T>[];
  disabled?: boolean;
  mode?: FormModalModeType;
}

const DynamicForm = <T,>({ fields, disabled, mode }: DynamicFormProps<T>) => {
  const { user } = useAppSelector((state) => state.auth);
  const form = Form.useFormInstance();

  return (
    <RowCustom>
      {fields.map((field) => (
        <Col key={field.name as string} span={field.col || 12}>
          <Form.Item name={field.name as string} label={field.label} rules={field.rules}>
            {(() => {
              const isDisabled =
                typeof field.disabled === 'function'
                  ? field.disabled({ role: user?.role as UserRole, mode })
                  : field.disabled;

              switch (field.type) {
                case FormFieldType.Input:
                  return (
                    <InputCustom
                      placeholder={field.placeholder}
                      disabled={isDisabled || disabled}
                      prefix={field.icon ? <field.icon /> : null}
                      {...field.props}
                    />
                  );
                case FormFieldType.InputPassword:
                  return (
                    <InputPasswordCustom
                      placeholder={field.placeholder}
                      disabled={isDisabled || disabled}
                      prefix={field.icon ? <field.icon /> : null}
                      {...field.props}
                    />
                  );
                case FormFieldType.ImageUpload:
                  return (
                    <UploadImageCustom
                      value={form.getFieldValue(field.name)}
                      onChange={(value) => form.setFieldsValue({ [field.name]: value })}
                      {...field.props}
                    />
                  );
                case FormFieldType.InputNumber:
                  return (
                    <InputNumberCustom
                      placeholder={field.placeholder}
                      disabled={isDisabled || disabled}
                      {...field.props}
                    />
                  );
                case FormFieldType.Select:
                  return (
                    <SelectCustom
                      placeholder={field.placeholder}
                      options={field.options}
                      disabled={isDisabled || disabled}
                      {...field.props}
                    />
                  );
                case FormFieldType.SelectFetch:
                  return (
                    <SelectFetchCustom
                      placeholder={field.placeholder}
                      fetchOptions={field.fetchOptions}
                      disabled={isDisabled || disabled}
                      {...field.props}
                    />
                  );
                case FormFieldType.DatePicker:
                  return (
                    <DatePickerCustom
                      placeholder={field.placeholder}
                      disabled={isDisabled || disabled}
                      {...field.props}
                    />
                  );
                case FormFieldType.TimePicker:
                  return (
                    <TimePickerCustom
                      placeholder={field.placeholder}
                      disabled={isDisabled || disabled}
                      {...field.props}
                    />
                  );
                case FormFieldType.TextArea:
                  return (
                    <InputTextAreaCustom
                      placeholder={field.placeholder}
                      disabled={isDisabled || disabled}
                      {...field.props}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </Form.Item>
        </Col>
      ))}
    </RowCustom>
  );
};

export default DynamicForm;
