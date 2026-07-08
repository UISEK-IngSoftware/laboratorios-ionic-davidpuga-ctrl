import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonTextarea, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { updateRepository } from '../services/GithubService';
import './Tab2.css'; 

interface RouteParams {
  owner: string;
  repoName: string;
}

interface RouteState {
  description: string;
}

const Tab4: React.FC = () => {
  const history = useHistory();
  const { owner, repoName } = useParams<RouteParams>();
  const location = useLocation<RouteState>();
  
  // 1. Agregamos un estado para poder modificar el nombre
  const [editName, setEditName] = useState(repoName); 
  const [editDescription, setEditDescription] = useState(location.state?.description || '');

  const handleUpdate = async () => {
    try {
      // 2. Aquí enviamos el 'editName' (el nuevo) al servidor. 
      // Ojo: En la URL de la API seguimos usando 'repoName' (el viejo) para que GitHub sepa cuál editar.
      await updateRepository(owner, repoName, { name: editName, description: editDescription });
      alert('Repositorio actualizado correctamente');
      history.replace('/tab1'); 
    } catch (error) {
      alert('Error al actualizar: ' + error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>Editar Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="form-container" style={{ marginTop: '20px' }}>
          <IonInput
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            value={editName} // 3. Conectamos el input al estado
            onIonChange={e => setEditName(e.detail.value!)} // 4. Permitimos que el texto cambie
            style={{ marginBottom: '15px' }}
          />
          <IonTextarea
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            rows={5}
            value={editDescription}
            onIonChange={e => setEditDescription(e.detail.value!)}
            autoGrow
            style={{ marginBottom: '15px' }}
          />
          <IonButton expand="block" onClick={handleUpdate}>
            Guardar Cambios
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;