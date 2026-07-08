import React from 'react';
import { pencilOutline, trashOutline, starOutline } from 'ionicons/icons';
import { 
    IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, 
    IonLabel, IonThumbnail 
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Importamos el router
import { Repository } from '../interfaces/Repository';
import { deleteRepository } from '../services/GithubService';

interface RepoItemProps extends Repository {
    onActionCompleted?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = (props) => {
    const history = useHistory(); // Activamos el historial de navegación

    const handleDelete = async () => {
        const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar ${props.name}?`);
        if (confirmar) {
            try {
                await deleteRepository(props.owner.login, props.name);
                if (props.onActionCompleted) {
                    props.onActionCompleted(); 
                }
            } catch (e) {
                alert('Error al eliminar: ' + e);
            }
        }
    };

    return (
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
                {/* Botón de Editar - Ahora nos manda al Tab4 */}
                <IonItemOption 
                    color="primary" 
                    onClick={() => {
                        // Navegamos al Tab4 pasando el owner y el nombre en la URL, 
                        // y la descripción de forma invisible en el estado
                        history.push({
                            pathname: `/tab4/${props.owner.login}/${props.name}`,
                            state: { description: props.description }
                        });
                    }}
                >
                    <IonIcon icon={pencilOutline} slot='icon-only' />
                </IonItemOption>

                <IonItemOption color="danger" onClick={handleDelete}>
                    <IonIcon icon={trashOutline} slot='icon-only' />
                </IonItemOption>

                <IonItemOption color="warning">
                    <IonIcon icon={starOutline} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default RepoItem;