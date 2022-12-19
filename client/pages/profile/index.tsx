import { useState } from 'react';
import { Layout } from '../../components/UI/Layout/Layout';
import { useGetProfileQuery } from '../../services/authAPI';
import { ProfileInfo } from '../../components/Account/ProfileInfo';
import { EditProfile } from '../../components/Account/EditProfile';
import { Button } from '../../components/UI/Button/Button';
import { Avatar } from '../../components/Account/Avatar';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { ActivateEmail } from '../../components/Account/ActivateEmail';

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: user, isLoading } = useGetProfileQuery();

  const handlerEdit = () => setIsEdit(prev => !prev);

  return (
    <Layout>
      <div
        className = 'flex flex-wrap justify-center'
      >
        {
          isLoading && <Spinner />
        }
        {
          user &&
          <>
            <div>
              {
                isEdit ?
                  <EditProfile
                    editUser = {user}
                    success = {handlerEdit}
                  /> :
                  <>
                    <ProfileInfo
                      user = {user}
                    />
                    <div
                      className = 'mt-2'
                    >
                      <Button
                        onClick = {handlerEdit}
                      >
                        Редактировать
                      </Button>
                    </div>
                  </>
              }
              {
                !user.isActive && <ActivateEmail/>
              }
            </div>
            <Avatar
              urlAvatar = {user.avatar}
            />
          </>
        }
      </div>
    </Layout>
  );
};

export default Page;
