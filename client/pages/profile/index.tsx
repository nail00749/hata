import { ReactElement, useState } from 'react';
import { Layout } from '../../components/UI/Layout';
import { useGetProfileQuery } from '../../services/authAPI';
import { ProfileInfo } from '../../components/Account/ProfileInfo';
import { EditProfile } from '../../components/Account/EditProfile';
import { Button } from '../../components/UI/Button/Button';
import { Avatar } from '../../components/Account/Avatar';

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: user } = useGetProfileQuery();

  const handlerEdit = () => setIsEdit(prev => !prev);

  return (
    <div
      className = 'flex flex-wrap'
    >
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
          </div>
          <Avatar
            urlAvatar = {user.avatar}
          />
        </>
      }
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Page;
