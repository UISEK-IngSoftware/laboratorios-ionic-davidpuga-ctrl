import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Tab2.css';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  
  // Estados para manejar el formulario y el spinner
  const [repoFormData, setRepoFormData] = useState<RepositoryPayload>({
    name: "",
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const saveRepository = () => {
    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio');
      return;
    }

    setLoading(true); // Activa el spinner
    createRepository(repoFormData)
      .then(() => {
        // Añadimos un pequeño retraso para darle tiempo a GitHub de actualizar su base de datos
        setTimeout(() => {
          history.push('/tab1'); // Navega tras el éxito
        }, 500);
      })
      .catch(() => {
        alert('Error al crear el repositorio');
      })
      .finally(() => {
        setLoading(false); // Oculta el spinner pase lo que pase
      });
  };

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
            onIonChange={e => setRepoFormData({ ...repoFormData, name: e.detail.value! })}
          ></IonInput>
          
          <IonTextarea
            className='form-field'
            label="Descripción del repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del Repositorio'
            rows={5}
            value={repoFormData.description}
            onIonChange={e => setRepoFormData({ ...repoFormData, description: e.detail.value! })}
            autoGrow
          ></IonTextarea>
          
          <IonButton
            className='form-field'
            expand="block"
            fill='solid'
            onClick={saveRepository}
            disabled={loading} // Deshabilita el botón mientras carga
          >
            Crear Repositorio
          </IonButton>
        </div>

        {/* Renderizado condicional del spinner */}
        {loading && <LoadingSpinner isOpen={loading} />}
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;