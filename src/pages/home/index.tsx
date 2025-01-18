import { useTranslation } from 'react-i18next';
import { usePermissions } from '../../contexts/permissions';
import ContainerAPI from '../../components/orginizim/containerAPI';
import { useEffect } from 'react';
const Home = () => {
  const { t } = useTranslation();
  const { useCheckPermission } = usePermissions();
  const permissions = useCheckPermission('Home', ['view', 'edit']);

  useEffect(() => {
    if (permissions.isSuccess) {
      console.log(permissions.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions.status]);

  return (
    <ContainerAPI query={permissions}>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>{t('Pages.EmptyPage.title')}</h5>
            <p>{t('Pages.EmptyPage.des')}</p>
          </div>
        </div>
      </div>
    </ContainerAPI>
  );
};

export default Home;
