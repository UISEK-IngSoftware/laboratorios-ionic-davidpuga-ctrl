import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const repoFormData: RepositoryPayload = {
    name: '',
    description: ''
  };

  const setRepoFormData = (value: string) => {
    repoFormData.name = value;
  }
  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  }

  const saveRepository = () => {
    if (repoFormData.name.trim() === '') {
      setErrorMsg("El nombre del repositorio es obligatorio.");
      return;
    }
    setLoading(true);
    createRepository(repoFormData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      setErrorMsg("Error al crear el repositorio-> " + error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useIonViewWillEnter(() => setErrorMsg(""))
  
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
            value={repoFormData.name}
            onIonChange={(e) => setRepoFormData(e.detail.value!)}
          ></IonInput>
          <IonTextarea
            className='form-field'
            label="Descripción del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del Repositorio'
            rows={5}
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
            autoGrow
          ></IonTextarea>
            {errorMsg !== "" && (
              <IonText color="danger">
                {errorMsg}
              </IonText>
            )}
          <IonButton
            className='form-field'
            expand="block"
            fill='solid'
            onClick={saveRepository}
          >
            Crear Repositorio
          </IonButton>
        </div>
        {loading && <LoadingSpinner isOpen={loading} />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
