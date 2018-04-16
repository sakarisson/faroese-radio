import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllArtists from '../Artists/AllArtists';
import Artist from '../Artists/Artist';
import keyGen from '../../Helpers/KeyGenerator';

export default store => (
  <Switch>
    <Route exact path="/artists" render={() => <AllArtists store={store} />} />
    {store.getState().artists.map(artist => (
      <Route key={keyGen.next} exact path={`/artists/${artist.name}`} render={() => <Artist key={keyGen.next} name={artist.name} />} />
    ))}
  </Switch>
);
