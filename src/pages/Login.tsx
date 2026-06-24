import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import { logoGithub } from 'ionicons/icons';
import { useState } from 'react';
import AuthService from '../services/AuthService';

const Login: React.FC = () => {

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [errormsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (username.trim() === '' || token.trim() === '') {
      setErrorMsg('Por favor, complete todos los campos.');
      return;
    }

    if (AuthService.login(username.trim(), token.trim())) {
      window.location.href = '/tab1';
    } else {
      setErrorMsg('Credenciales inválidas.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Iniciar Sesión</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='login-container'>
          <form className='login-form' onSubmit={handleLogin}>
            <IonIcon icon={logoGithub} className='login-logo' />

            <IonInput
              className="login-field"
              label="Usuario de Github"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Ingrese su usuario de Github"
              value={username}
              onIonChange={e => setUsername(e.detail.value!)}
              required
            />

            <IonInput
              className="login-field"
              label="Token de Github"
              labelPlacement="floating"
              fill="outline"
              type="password"
              placeholder="Ingrese su token de Github"
              value={token}
              onIonChange={e => setToken(e.detail.value!)}
              required
            />
            {errormsg !== '' && (
              <IonText className="danger">{errormsg}</IonText>
            )}
            <IonButton expand='block' type='submit'>Iniciar Sesión</IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;