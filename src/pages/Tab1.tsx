import { IonContent, IonHeader, IonList, IonPage,  IonText,  IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import { Repository} from '../interfaces/Repository';
import RepoItem from '../components/RepoItem';
import { fetchRepositories } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setrepositorylist] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);


  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setrepositorylist(reposData)
    setLoading(false)
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositrios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {repositoryList.map((repo) => (
          <RepoItem key={repo.id} {...repo} />

        ))}

        <IonList>
          {repositoryList.map((repo) => (
          <RepoItem {...repo} />
        ))}
        </IonList>
        {loading && <LoadingSpinner />}

        {!loading && repositoryList.length === 0 &&
          (<IonText color="danger">
            <p>No se cargaron los repos :c</p>
          </IonText>)
        }

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
