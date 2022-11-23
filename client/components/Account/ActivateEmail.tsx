import { Button } from '../UI/Button/Button';
import { useSendCodeMutation } from '../../services/authAPI';

export const ActivateEmail = () => {
  const [send, { isSuccess }] = useSendCodeMutation();

  const handlerCode = () => send();

  return (
    <div
      className = ''
    >
      <div>Потвердите свой email</div>
      <Button
        onClick = {handlerCode}
      >
        Отправить письмо
      </Button>
    </div>
  );
};
