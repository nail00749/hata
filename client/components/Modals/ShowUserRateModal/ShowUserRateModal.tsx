import { Modal } from '../Modal';
import { useLazyGetRatingByUserQuery } from '../../../services/userRatingAPI';
import { FC, useEffect } from 'react';
import { Accordeon } from '../../Accordeon/Accordeon';

interface ShowUserRateModalProps {
  open: boolean;
  handlerVisible: () => void;
  userId: string | null;
}

const ShowUserRateModal: FC<ShowUserRateModalProps> = ({ open, handlerVisible, userId }) => {
  const [triggerRating, { data }] = useLazyGetRatingByUserQuery();

  useEffect(() => {
    if (userId) {
      triggerRating(userId);
    }
  }, [userId, open]);

  return (
    <Modal
      title = {'Рейтинг пользователя'}
      open = {open}
      handlerVisible = {handlerVisible}
    >
      {
        data &&
        <div
          className = {'flex flex-col items-center p-2'}
        >
          {
            data.avg ?
              <div>
                {`Средний рейтинг: ${data.avg.substring(0, 4)}`}
              </div> :
              <div>Нет данных</div>
          }
          {
            data.rates && data.rates.length ?
              data.rates.map(rate =>
                <Accordeon
                  title = {'Посмотреть рейтинг'}
                >
                  <h1>{`Оценка: ${rate.rating}`}</h1>
                  <div>{`Комментарий: ${rate.comment}`}</div>
                </Accordeon>,
              ) :
              null
          }
        </div>
      }
    </Modal>
  );
};

export default ShowUserRateModal;
