import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
          className='form-input'
          label="Nombre del repositorio"
          labelPlacement='floating'
          fill='outline'
          placeholder='Nombre del Repositorio'
          ></IonInput>
          <IonTextarea
          className='form-field'
          label="Descripción del repositorio"
          labelPlacement='floating'
          fill='outline'
          placeholder='Descripción del Repositorio'
          rows={5}
          autoGrow
          ></IonTextarea>
          <IonButton
          className='form-field'
          expand="block"
          fill='solid'
          >
            Crear Repositorio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
