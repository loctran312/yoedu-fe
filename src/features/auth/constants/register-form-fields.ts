import { FormFieldType } from "@/shared/types/form-field-type";
import { rules } from "@/shared/utils/rules";
import { LockKeyhole, Mail } from "lucide-react";

export const registerFormFields = [
    {
        name: 'email',
        label: 'Email',
        type: FormFieldType.Input,
        placeholder: 'Nhập email',
        icon: Mail,
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập email',
            },
            rules.email,
        ],
    },
    {
        name: 'password',
        label: 'Mật khẩu',
        type: FormFieldType.InputPassword,
        placeholder: 'Nhập mật khẩu',
        icon: LockKeyhole,
        rules: [
            {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
            },
            rules.password,
        ],
    },
    {
        name: 'confirmPassword',
        label: 'Xác nhận mật khẩu',
        type: FormFieldType.InputPassword,
        placeholder: 'Nhập lại mật khẩu',
        icon: LockKeyhole,
        rules: [
            {
                required: true,
                message: 'Vui lòng xác nhận mật khẩu',
            },
            rules.password,
            ({ getFieldValue }: any) => ({
                validator(_: any, value: string) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                },
            }),
        ],
    },
];