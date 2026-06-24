import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonViewWillEnter 
} from '@ionic/react';
import './Tab3.css';
import { GithubUser } from '../interfaces/GithubUser';
import { fetchUserInfo } from '../services/GithubService';
import React from 'react';

const Tab3: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);

  useIonViewWillEnter(() => {
    setLoading(true);
    fetchUserInfo()
      .then((githubUser) => {
        setUserInfo(githubUser);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMsg("Error al cargar usuario");
        setLoading(false);
      });
  }); // Se removió el ");" extra que rompía el código aquí

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          {loading && <p>Cargando usuario...</p>}
          {errorMsg && <p>{errorMsg}</p>}
          
          {userInfo && (
            <IonCard className="card">
              {/* Corregido: Sin comillas en los atributos dinámicos */}
              <img src={userInfo.avatar_url} alt={userInfo.login} />
              <IonCardHeader>
                {/* Corregido: Leyendo desde 'userInfo' y arreglado el typo de 'login' */}
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
              </IonCardHeader> 
              <IonCardContent>
                Desarrollador de software, fan de Tolkien, fantasía medieval, ciencia ficción y tokusatsu xd.
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;