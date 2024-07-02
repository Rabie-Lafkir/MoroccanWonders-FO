import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { login } from '../../features/auth/authSlice';
import { RootState, AppDispatch } from '../../app/store';
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const breadcrumbItems = [
    { label: t('home'), url: '/' },
    { label: t('login') },
  ];

  const title: string = `${t('login')} - Moroccan Wonders`;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login({ username, password }));
    if (auth.status === 'succeeded') {
      navigate("/");

    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t('login')}
        breadcrumbItems={breadcrumbItems}
      />
      <section className="contact-one" style={{ marginTop: '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-one__content">
                <div className="block-title text-left">
                  <p>{t('login')}</p>
                  <h3>{t('titleLogin')}</h3>
                </div>
                <div className="contact-one__content-text">
                  <p>{t('descriptionLogin')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-one__form" onSubmit={handleLogin}>
                <div className="row low-gutters">
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        name="username"
                        type="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <p>
                      Don't have an account?{' '}
                      <Link to="/signin">{t('signin')}</Link>
                    </p>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <button
                        type="submit"
                        className="thm-btn contact-one__btn"
                      >
                        {t('login')}
                      </button>
                    </div>
                  </div>
                </div>
                {auth.error && <p className="error">{auth.error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
