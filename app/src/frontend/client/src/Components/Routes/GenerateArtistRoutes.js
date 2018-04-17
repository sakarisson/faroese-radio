import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllArtists from '../Artists/AllArtists';
import Artist from '../Artists/Artist';
import { initializeArtistSongs } from '../../Data/Artists';
import keyGen from '../../Helpers/KeyGenerator';

export default store => (
  <Switch>
    <Route exact path="/artists" render={() => <AllArtists store={store} />} />
    {store.getState().artists.map(artist => (
      <Route
        key={keyGen.next}
        exact
        path={`/artists/${artist.name}`}
        render={() => {
          if (artist.songs.length > 0) {
            return (
              <Artist
                key={keyGen.next}
                name={artist.name}
                songs={artist.songs}
              />);
            }
            initializeArtistSongs(store, artist.name);
            return (<p>Hello</p>);
          }
        }
      />
    ))
  }
  </Switch>
);
