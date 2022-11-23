import { Button } from '../UI/Button/Button';
import { useSendCodeMutation } from '../../services/authAPI';

export const ActivateEmail = () => {
  const [send] = useSendCodeMutation();

  const handlerCode = () => send();

  return (
    <div
      className = ''
    >
      <div>Подтвердите свой email</div>
      <Button
        onClick = {handlerCode}
      >
        Отправить письмо
      </Button>
    </div>
  );
};
