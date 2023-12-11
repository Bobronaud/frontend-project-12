import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { pageRoutes } from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <div className="text-center alert">
            <h1 className="h4 text-muted">{t('page404.header')}</h1>
            <p className="text-muted">
              {t('page404.body')}
              <Link to={pageRoutes.chat()}>{t('page404.link')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
