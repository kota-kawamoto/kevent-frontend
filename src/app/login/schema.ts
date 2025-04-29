import * as yup from 'yup'

export const loginSchema = yup.object({
  login_id: yup
    .string()
    .required('ログインIDは必須です')
    .max(10, 'ログインIDは10文字以内で入力してください'),
  password: yup
    .string()
    .required('パスワードは必須です')
    .min(4, 'パスワードは4文字以上で入力してください')
    .max(10, 'パスワードは10文字以内で入力してください')
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      'パスワードは半角英数字、ハイフン、アンダースコアのみ使用できます'
    ),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
