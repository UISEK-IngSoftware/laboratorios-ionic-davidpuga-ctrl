import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React from 'react';
import './Tab3.css';
import { GithubUser } from '../interfaces/GithubUser'; 
import { getUserInfo } from '../services/GithubService'; // Asegúrate de que se llame getUserInfo o getUserInf según tu servicio
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {
    const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true); // 1. Estado inicializado en true

    const loadUserInfo = async () => {
      setLoading(true); // 2. Activamos el spinner al empezar a buscar los datos
      const userData = await getUserInfo(); 
      setUserInfo(userData);
      setLoading(false); // Desactivamos el spinner cuando los datos llegan
    };

    useIonViewDidEnter(() => {
      loadUserInfo();
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

       {/* Opcional: Ocultamos la tarjeta si está cargando para que no se vea vacía */}
       {!loading && userInfo && (
         <div className="card-container">
            <IonCard className="card">
              <img src={userInfo?.avatar_url} alt={userInfo?.login} />
              <IonCardHeader>
                <IonCardTitle color="primary">{userInfo?.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {userInfo?.bio}
              </IonCardContent>
            </IonCard>
          </div>
       )}

        {/* 3. Sintaxis corregida del componente LoadingSpinner */}
        {loading && <LoadingSpinner isOpen={loading} />}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;