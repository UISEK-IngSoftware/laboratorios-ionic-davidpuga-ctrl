import React, { useState } from 'react';
import { pencilOutline, trashOutline, starOutline } from 'ionicons/icons';
import { 
    IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, 
    IonLabel, IonThumbnail, IonModal, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonButtons 
} from '@ionic/react';
import { Repository } from '../interfaces/Repository';
import { deleteRepository, updateRepository } from '../services/GithubService';

// 1. Extendemos tu interfaz para recibir la función que recarga la página
interface RepoItemProps extends Repository {
    onActionCompleted?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = (props) => {
    // Estados para el formulario de edición (Modal)
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState(props.name);
    const [editDescription, setEditDescription] = useState(props.description || '');

    // 2. Función para Actualizar
    const handleUpdate = async () => {
        try {
            await updateRepository(props.owner.login, props.name, { name: editName, description: editDescription });
            setShowEditModal(false); // Cierra el formulario
            if (props.onActionCompleted) {
                props.onActionCompleted(); // ¡Recarga la lista automáticamente!
            }
        } catch(e) {
            alert('Error al actualizar: ' + e);
        }
    };

    // 3. Función para Eliminar
    const handleDelete = async () => {
        const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar ${props.name}?`);
        if (confirmar) {
            try {
                await deleteRepository(props.owner.login, props.name);
                if (props.onActionCompleted) {
                    props.onActionCompleted(); // ¡Recarga la lista automáticamente!
                }
            } catch (e) {
                alert('Error al eliminar: ' + e);
            }
        }
    };

    return (
        <>
            <IonItemSliding>
                <IonItem>
                    <IonThumbnail slot="start">
                        <img src={props.owner.avatar_url} alt={props.name} />
                    </IonThumbnail>
                    <IonLabel>
                        <h3>{props.name}</h3>
                        {props.description && <p>{props.description}</p>}
                        {props.language && (
                            <p><strong>Language:</strong> {props.language}</p>
                        )}
                    </IonLabel>
                </IonItem>
                
                <IonItemOptions>
                    {/* Botón de Editar - Abre el modal */}
                    <IonItemOption color="primary" onClick={() => setShowEditModal(true)}>
                        <IonIcon icon={pencilOutline} slot='icon-only' />
                    </IonItemOption>

                    {/* Botón de Eliminar */}
                    <IonItemOption color="danger" onClick={handleDelete}>
                        <IonIcon icon={trashOutline} slot='icon-only' />
                    </IonItemOption>

                    <IonItemOption color="warning">
                        <IonIcon icon={starOutline} slot='icon-only' />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>

            {/* --- MODAL DE EDICIÓN --- */}
            <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Editar Repositorio</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowEditModal(false)}>Cerrar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <IonInput
                            label="Nombre del repositorio"
                            labelPlacement="floating"
                            fill="outline"
                            value={editName}
                            onIonChange={e => setEditName(e.detail.value!)}
                        />
                        <IonTextarea
                            label="Descripción del repositorio"
                            labelPlacement="floating"
                            fill="outline"
                            value={editDescription}
                            onIonChange={e => setEditDescription(e.detail.value!)}
                            rows={5}
                            autoGrow
                        />
                        <IonButton expand="block" onClick={handleUpdate}>
                            Guardar Cambios
                        </IonButton>
                    </div>
                </IonContent>
            </IonModal>
        </>
    );
};

export default RepoItem;