import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useNotification } from '@/shared/hooks/useNotification';
import type { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../store/auth-thunk';
import CardCustom from '@/shared/components/card/CardCustom';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { showNotification } = useNotification();

  const navigate = useNavigate();
  // const [form] = Form.useForm<LoginFormValues>();

  const onFinish = async (values: LoginFormValues) => {
    try {
      await dispatch(
        loginThunk({
          email: values.email,
          password: values.password,
        }),
      ).unwrap();

      showNotification(
        'success',
        'Đăng nhập thành công',
        'Bạn đã đăng nhập thành công. Vui lòng tiếp tục sử dụng hệ thống.',
      );

      navigate('/', { replace: true });
    } catch (error: any) {
      showNotification('error', 'Đăng nhập thất bại', error || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };
  return (
    <CardCustom>
      
    </CardCustom>
  );
};

export default LoginPage;
