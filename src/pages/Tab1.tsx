import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { fetchRepositories } from '../services/GithubService';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<String>("");

  const loadRepos = async () => {
    setLoading(true);
    fetchRepositories().then((reposData)=>{
      setRepos(reposData)
    }).catch((error)=>{
      setErrorMsg("Error al cargar repositorios. " + error);
    }).finally(()=> setLoading(false))
  }

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map(repo => (
            <RepoItem key={repo.id} {...repo} onActionCompleted={loadRepos} />
          ))}
        </IonList>

        {loading && <LoadingSpinner isOpen={loading} />}
        
        {errorMsg !== "" && (
          <IonText color="danger">
            {errorMsg}
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;