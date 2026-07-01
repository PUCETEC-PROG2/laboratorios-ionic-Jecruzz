import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { Repository } from '../interfaces/Repository';
import './Tab2.css';
import { createRepository, updateRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ repoToEdit?: Repository }>();
  
  
  const repoToEdit = location.state?.repoToEdit;
  const isEditing = !!repoToEdit;

  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (repoToEdit) {
      setRepositoryData({
        name: repoToEdit.name,
        description: repoToEdit.description || ""
      });
    }
  }, [repoToEdit]);

  const saveRepo = async () => {  
    if (!repositoryData.name || repositoryData.name.trim() === ''){
      setErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }
    
    setLoading(true);
    setErrorMsg("");

    try {
      if (isEditing && repoToEdit) {
        // Lógica PATCH
        await updateRepository(repoToEdit.owner.login, repoToEdit.name, repositoryData);
      } else {
        // Lógica POST
        await createRepository(repositoryData);
      }
      
      // Limpiamos y redirigimos
      setRepositoryData({ name: "", description: "" });
      history.push("/tab1");
    } catch (error) {
      const apiError = error instanceof Error ? error.message : String(error);
      setErrorMsg(`Error al ${isEditing ? 'actualizar' : 'crear'} el repositorio: ${apiError}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? 'Editar Repositorio' : 'Formulario del repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditing ? 'Editar Repositorio' : 'Nuevo Repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ingrese el nombre del repositorio"
            value={repositoryData.name}
            onIonChange={(e) => setRepositoryData({...repositoryData, name: e.detail.value ?? ""})}
          />
          <IonTextarea
            className='form-field'
            label='Descripción del repositorio'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repositorio'
            value={repositoryData.description}
            onIonChange={(e) => setRepositoryData({...repositoryData, description: e.detail.value ?? ""})}
            rows={6}
          />
          {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText> }  
          <IonButton
            className='form-field'
            expand='block'
            color="secondary"
            shape="round"
            onClick={saveRepo}
          >
            {isEditing ? 'Actualizar' : 'Guardar'}
          </IonButton>
        </div>
        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;