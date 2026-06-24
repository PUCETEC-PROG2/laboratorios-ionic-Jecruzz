import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { Repository } from '../interfaces/Repository';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: "",
    description: ""
  })
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMSg] = useState("");

  const saveRepo = async() => {
    if (repositoryData.name.trim() === '') {
      setErrorMSg("El nombre del repo es obligatorio");
      return;
    }
    setLoading(true);
    createRepository(repositoryData)
    .then(() => hisstory.push("/tab1"))
    .catch((error) => setErrorMSg("Error al crear los repos :c") + error)
    .finally(() => setLoading(false));
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label='Nombre del Repositorio'
            labelPlacement='floating'
            placeholder="Ingrese el nombre del repositorio"
            value={repositoryData.name}
            onIonChange={(e) => setRepositoryData({...repositoryData, name: e.detail.value!})}
          />
          <IonTextarea
            className="form-field"
            label='Descripción del Repositorio'
            labelPlacement='floating'
            placeholder="Ingrese la descripción del repositorio"
            value={repositoryData.description}
            onIonChange={(e) => setRepositoryData({...repositoryData, description: e.detail.value!})}
            rows={5}
          />
          <IonButton
          className="form-field"
          expand="block"
          shape="round"
          color="success"
          >
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
