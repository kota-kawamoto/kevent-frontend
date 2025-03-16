import * as yup from 'yup'

export const userSchema = yup.object({
  name: yup
    .string()
    .required('氏名は必須です')
    .max(50, '氏名は50文字以内で入力してください'),
  login_id: yup
    .string()
    .required('ログインIDは必須です')
    .min(4, 'ログインIDは4文字以上で入力してください')
    .max(20, 'ログインIDは20文字以内で入力してください')
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      'ログインIDは半角英数字、ハイフン、アンダースコアのみ使用できます'
    ),
  group_id: yup.string().required('所属グループは必須です'),
})

export type UserFormData = yup.InferType<typeof userSchema>
