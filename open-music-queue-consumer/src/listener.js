class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      
      const playlistInfo = await this._playlistsService.getPlaylistInfo(playlistId);
      const songsInfo = await this._playlistsService.getSongsInPlaylist(playlistId);
      const data = {
        playlist: {
          ...playlistInfo,
          songs: songsInfo,
        },
      }

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
