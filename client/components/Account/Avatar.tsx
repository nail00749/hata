import { ChangeEvent, FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { BaseURL } from '../../config/BaseURL';
import { useUpdateAvatarMutation } from '../../services/authAPI';
import { Button } from '../UI/Button/Button';

interface AvatarProps {
  urlAvatar: string | undefined;
}

export const Avatar: FC<AvatarProps> = ({ urlAvatar }) => {
  const [focus, setFocus] = useState(false);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [update, { isSuccess, isLoading }] = useUpdateAvatarMutation();

  useEffect(() => {
    if (isSuccess) {
      setAvatar(undefined);
    }
  }, [isSuccess]);

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setAvatar(e.currentTarget.files[0]);
    }
  };

  const handlerUpdate = () => {
    const formData = new FormData();
    formData.append('avatar', avatar as Blob);
    update(formData);
  };

  return (
    <div
      className = 'flex flex-col items-center'
    >
      <div
        className = 'relative w-20 h-20 rounded-full'
        onMouseEnter = {() => setFocus(true)}
        onMouseLeave = {() => setFocus(false)}
      >
        <Image
          className = {focus ? 'blur-sm' : undefined}
          src = {urlAvatar ? BaseURL + urlAvatar : '/profile.svg'}
          width = {200}
          height = {200}
        />
        {
          focus &&
          <div
            className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          >
            <Image
              src = {'/camera.svg'}
              height = {20}
              width = {20}
            />
            <input
              className = 'absolute w-10 h-20 opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              type = 'file'
              onChange = {handlerFile}
              accept = {'image/*'}
            />
          </div>
        }
      </div>
      {
        avatar &&
        <Button
          onClick = {handlerUpdate}
          isLoading = {isLoading}
        >
          Обновить
        </Button>
      }
    </div>
  );
};
