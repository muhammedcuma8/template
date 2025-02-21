import React from 'react';
import Button from '../../components/basic/ktnButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const goDashboard = () => {
    navigate('/');
  };

  return (
    <div className="pages-body notfound-page flex flex-column">
      <div className="topbar p-3 flex justify-content-between flex-row align-items-center">
        <div className="topbar-left ml-3 flex">
          <div className="logo">
            <img src="/assets/layout/images/logo2x.png" alt="" />
          </div>
        </div>
        <div className="topbar-right mr-3 flex">
          <Button
            type="button"
            onClick={goDashboard}
            label={i18n.t('DASHBOARD')}
            className="p-button-text p-button-plain topbar-button"
          ></Button>
        </div>
      </div>

      <div className="align-self-center mt-auto mb-auto">
        <div className="pages-panel card flex flex-column">
          <div className="pages-header px-3 py-1">
            <h2>{i18n.t('PageNotFound')}</h2>
          </div>
          <div className="card mt-3 px-6">
            <img src="/assets/layout/images/pages/404.png" alt="" />
          </div>
          <div className="pages-detail pb-6">
            {i18n.t('Requestedresourceisnotavailable')}
          </div>
          <Button
            type="button"
            onClick={goDashboard}
            label={i18n.t('GOBACKTODASHBOARD')}
            className="p-button-text"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
