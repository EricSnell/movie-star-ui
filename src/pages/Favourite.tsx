import { IonButtons, IonContent, IonHeader, IonMenuButton, IonProgressBar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context';

const ResultsList = React.lazy(() => import('../components/ResultsList') );

interface FavResults {
  catogery?: string,
  id?: number,
  name?: string,
  poster_path?: string,
  title?: string,
}

const Favourite: React.FC<any> = () => {

  const [results, setResults] = useState<FavResults[]>();
  const context = useContext<any>(UserContext);

  useEffect(() => {
    if(context.user && context.favourites && context.favourites.length === 0){
      context.getFavourites(context.user.uid).then(fav => setResults(Object.values(fav.data())));
    }
    else{
      setResults(context.favourites);
    }
    return () => setResults([]);
  }, [context, context.favourites, context.user]);

  const getContent = () => {
    if (typeof context.user === 'undefined' || context.user === null) {
      return <h1>Login to view favourites</h1>
    }

    if (results && results.length > 0) {
      return <ResultsList results={results} />
    }
    else if (results && results.length === 0) {
      return <>No favourites :( <br />Add some</>
    }
    return <IonProgressBar type="indeterminate" />
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favourites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {getContent()}
      </IonContent>
    </>
  )
}

export default Favourite;