import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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

        <div className="card-container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/235344001?s=400&u=345f0a31bba2f2d77a6dbfee439468f47d5ed9f9&v=4" alt="Avatar" />
            <IonCardTitle>David Puga</IonCardTitle>
            <IonCardSubtitle>davidpuga-ctrl</IonCardSubtitle>
            <IonCardHeader>
              <IonCardContent>
                Hola, me gusta los negocios, los autos y la tecnologia.
              </IonCardContent>
            </IonCardHeader>
          </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
