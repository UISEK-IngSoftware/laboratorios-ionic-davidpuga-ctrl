import { 
  IonButton,
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonText, 
  IonTitle, 
  IonToolbar, 
  useIonViewDidEnter,
  useIonViewWillEnter 
} from '@ionic/react';
import React from 'react';
import './Tab3.css';
import { GithubUser } from '../interfaces/GithubUser'; 
import { getUserInfo } from '../services/GithubService'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router';
import AuthService from '../services/AuthService';
import { logOutOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [errorMsg, setErrorMsg] = React.useState<string>(""); 
  const history = useHistory()

  const loadUserInfo = async () => {
    setLoading(true);
    getUserInfo()
      .then((user) => setUserInfo(user))
      .catch((error) => setErrorMsg("Error al leer información de usuario. " + error))
      .finally(() => setLoading(false));
  };

  const handleLogout = () =>{
    AuthService.logout()
    history.replace('/login')
  }

  useIonViewWillEnter(() => {
    setErrorMsg("");
  });

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader> {/* CORREGIDO: Ya dice IonHeader y no ExpressHeader */}
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          {userInfo && (
            <IonCard className="card">
              <img src={userInfo?.avatar_url} alt={userInfo?.login} />
              <IonCardHeader>
                <IonCardTitle color="primary">{userInfo?.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>{userInfo?.bio}</IonCardContent>
            </IonCard>
          )}

          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton
          expand='block'
          color='danger'
          onClick={handleLogout}
          >
            <IonIcon slot="start" icon={logOutOutline}/>
            Salir
          </IonButton>
        </div>

        {loading && <LoadingSpinner isOpen={loading} />}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;