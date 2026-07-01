import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  useIonViewWillEnter,
  IonText,
  useIonAlert
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab1.css';
import { Repository } from '../interfaces/Repository';
import RepoItem from '../components/RepoItem'; 
import { fetchRepositories, deleteRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner'; 

const Tab1: React.FC = () => {
  const history = useHistory();
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [presentAlert] = useIonAlert();

  const loadRepos = async () => {
    setLoading(true); 
    setErrorMsg("");
    
    fetchRepositories()
      .then((reposData) => setRepositoryList(reposData))
      .catch((error) => {
        console.error(error);
        const apiError = error instanceof Error ? error.message : String(error);
        setErrorMsg(`Error al cargar repositorios: ${apiError}`);
      })
      .finally(() => setLoading(false));
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  
  const handleDelete = async (owner: string, repoName: string) => {
    setLoading(true);
    try {
      await deleteRepository(owner, repoName);
      loadRepos(); 
    } catch (error) {
      const apiError = error instanceof Error ? error.message : String(error);
      setErrorMsg(`Error al eliminar: ${apiError}`);
      setLoading(false);
    }
  };

  
  const handleEdit = (repo: Repository) => {
    history.push({
      pathname: '/tab2',
      state: { repoToEdit: repo } 
    });
  };

  const confirmDelete = (owner: string, repoName: string) => {
    presentAlert({
      header: 'Eliminar repositorio',
      message: `¿Estás seguro de que deseas eliminar "${repoName}"? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí, eliminar',
          role: 'confirm',
          handler: () => {
            handleDelete(owner, repoName);
          },
        },
      ],
    });
  };

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
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && <LoadingSpinner />}

        {!loading && repositoryList.length > 0 && (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem
                key={repo.name}
                {...repo}
                onEdit={() => handleEdit(repo)}
                onDelete={() => confirmDelete(repo.owner.login, repo.name)}
              />
            ))} 
          </IonList>
        )}

        {!loading && errorMsg && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <IonText color="danger">
              <p style={{ fontWeight: 'bold' }}>{errorMsg}</p>
            </IonText>
          </div>
        )} 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;