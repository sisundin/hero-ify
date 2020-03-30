Description of the project

Hero-ify is an app where the user can create their own Spotify playlist based on a Superhero of their choice. The user can also decide on the mood, energy and length of the playlist. The user logs on with their existing Spotify account and the playlist, when finished, is saved to it. All playlists created are also saved to Firebase, and users are allowed to see recent playlists created by others.


What we have done

We have set up connections to two API:s: Superhero API and Spotify, and created a few views for the user. In the first view, the user is prompted to start creating their playlist and is then redirected to log on to their Spotify account. In the second view, the customer can search for a Superhero of their choice, which are fetched from the Superhero API. After this, three views where the user can adjust their playlist follows, where the user chooses mood, energy and length with a slider. After this, the user is presented with a mock-up final view where it says that the playlist has been created and some playlists by other users are showcased, but this functionality is not built yet.


What we still plan to do

We still need to make an algorithm that converts the abilities of the chosen Superhero into an actual playlist. Each superhero has a set of abilities (for example strength and intelligence) where every ability has a certain value. The idea is that the each ability will correspond with a genre of music, and that the ratio of each ability will be the same as the ratio of each corresponding genre in the finished playlist. We will also continue to work on the overall design and usability.


Our project file structure


choosehero
- chooseHero.js
  A search view that lets the user search for and select a hero to base their playlist on.
- Headerandfooter
  - footer.js
    Displays a footer with text
  - header.js
    Displays a header that shows how far the user has come in the process of creating their playlist
- modelandconfig
  - apiconfig.js
    Connections to the Superhero API and the Spotify API
  - model.js
    Handles the data based on user input in the different views. To be done: handling the data from the user input in the playlist customization steps to actually generate a playlist
- othersplaylists
  - allplaylistscreated.js
    To be done: displaying previously user-generated Heroify playlists stored in the database
- playlistcreator
  - selectenergylevel.js 
    Displays a slider that lets the user decide how energetic the playlist should be, ranging from mellow to energetic
  - selectMood.js
    Displays a slider that lets the user decide what mood the playlist should have, ranging from sad to happy
  - selectLength.js
    Displays a slider that lets the user customize the length of the playlist
  - showplaylist.js
    To be done: displaying the playlist generated from the user input in the previous views
- signin
  - signinview.js
    Enables the user to log into their personal Spotify account
