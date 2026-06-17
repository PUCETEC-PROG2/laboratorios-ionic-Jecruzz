import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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
          <IonCard className="card">
            <img src="https://s.pacn.ws/1/p/1bk/s-h-figuarts-shinkocchou-seihou-kamen-rider-ryuki-kamen-rider-ry-856257.3.jpg?v=ssmuq5&width=800" alt="Avatar" />
            <IonCardHeader>
              <IonCardTitle>Josue Esteban Cruz Zapata</IonCardTitle>
              <IonCardSubtitle>JosuSTK</IonCardSubtitle>
            </IonCardHeader> 
            <IonCardContent>
              Desarrollador de software, fan de Tolkien, fantasía medieval, ciencia ficción y tokusatsu xd.

              
            </IonCardContent>
          </IonCard>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
