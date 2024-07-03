// src/pages/LogInPage/LoginPage.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import { setAuthData } from '../../store/authSlice';
import axiosInstance from '../../helpers/axiosInstance';

export default function LoginPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/account/login', { username, password });
      const data = response.data;
      dispatch(setAuthData({
        userId: data.userId,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
      navigate('/');
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${t('login')} - Moroccan Wonders`}</title>
      </Helmet>
      <PageHeader
        backgroundImageUrl="assets/images/backgrounds/page-header-contact.jpg"
        pageTitle={t('login')}
        breadcrumbItems={[
          { label: t('home'), url: '/' },
          { label: t('login') },
        ]}
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
                        type="text"
                        placeholder="Username"
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
