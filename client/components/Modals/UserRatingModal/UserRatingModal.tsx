import { Modal } from '../Modal';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useCreateUserRatingMutation } from '../../../services/userRatingAPI';
import { IBooking } from '../../../models/IBooking';
import { IUserRating } from '../../../models/IUserRating';
import { TextArea } from '../../UI/TextArea';
import { Button } from '../../UI/Button/Button';
import { Rating } from '../../Rating/Rating';

interface UserRatingModalProps {
  open: boolean;
  handlerVisible: () => void;
  booking: IBooking | null;
}

export const UserRatingModal: FC<UserRatingModalProps> = ({ open, handlerVisible, booking }) => {
  const [create, { isLoading, isSuccess }] = useCreateUserRatingMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if(isSuccess){
      handlerVisible()
    }
  }, [isSuccess]);

  const handlerCreate = () => {
    if (booking) {
      const data: Partial<IUserRating> = {
        rating,
        comment,
        booking: booking.id,
        user: booking.tenant.id
      };
      create(data);
    }
  };

  const handlerComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const hanlerRating = (value: number) => () => {
    setRating(value === rating ? 0 : value);
  };

  return (
    <Modal
      title = {'Оценить жителя'}
      open = {open}
      handlerVisible = {handlerVisible}
    >
      <div
        className = {'flex flex-col items-center'}
      >
        <Rating
          value = {rating}
          onChange = {hanlerRating}
        />
        <TextArea
          value = {comment}
          onChange = {handlerComment}
        />
        <Button
          onClick = {handlerCreate}
          isLoading = {isLoading}
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};
