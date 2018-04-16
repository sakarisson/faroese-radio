import React from 'react';
import { Route } from 'react-router-dom';
import AllArtists from '../Components/Artists/AllArtists';
import Artist from '../Components/Artists/Artist';
import keyGen from './KeyGenerator';

export default store => (
  <div className="artistRoutes">
    <Route exact path="/artists" render={() => <AllArtists store={store} />} />
    {store.getState().artists.map(artist => (
      <Route key={keyGen.next} exact path={`/artists/${artist.name}`} render={() => <Artist key={keyGen.next} name={artist.name} />} />
    ))}
  </div>
);
