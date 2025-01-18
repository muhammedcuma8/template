import { columns, getArticleStore } from './constant';
import { useTranslation } from 'react-i18next';
import { useHttp } from '../../hooks/useHttp';
import { SSO_API } from '../../configs/APIURL';
import { useNotifyContext } from '../../contexts/notify';
import KTNDataGrid from '../../components/basic/ktnDataGrid';

const Article = () => {
  const { i18n } = useTranslation();
  const { showNotification } = useNotifyContext();

  const http = useHttp(SSO_API);
  //create devextreme store
  const custom_store = getArticleStore(showNotification, http);
  const pageSizes = [10, 25, 50, 100];

  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>{i18n.t('Pages.Articles')}</h5>
            <KTNDataGrid
              custom_store={custom_store}
              columns={columns}
              pageSizes={pageSizes}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
