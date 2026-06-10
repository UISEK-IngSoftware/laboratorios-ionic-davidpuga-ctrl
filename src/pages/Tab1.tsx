import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { fetchRepositories } from '../services/GithubService';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadRepos = async () => {
    setLoading(true);
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false);
  };

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
      <IonContent fullscreen>
        <IonList>
          {repos.map((repo) => (
            <RepoItem key={repo.id} {...repo} />
          ))}
        </IonList>
        {loading && <LoadingSpinner isOpen={loading} />}
        {!loading && repos.length === 0 && (
          <div>
            <p>No se encontraron repositorios.</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;