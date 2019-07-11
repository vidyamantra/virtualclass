(function (window) {
  const videoUl = function () {
    return {
      videos: [],
      uploaderParam: {},
      videoObj: {},
      videoId: '',
      videoUrl: '',
      isfullscreen: false,
      order: [],
      currPlaying: '',
      autoPlayFlag: 1,
      status: 0,
      yts: false,
      online: false,
      listEndPause: false,
      attachPlayer: false,
      lastSeek: 0,

      /*
       * it creates the the necessary layout and containers to place
       * video
       * Call to the function to create player object
       * @param  videoObj
       * @param  startFrom the position from where to start playing video in second

       */
      init() {
        this.videoInit = true;
        this.currPlaying = '';
        this.pages = {};
        virtualclass.previrtualclass = 'virtualclassVideo';
        virtualclass.previous = 'virtualclassVideo';
        this.autoPlayFlag = 1;
        this.UI.container();
        if (roles.hasControls()) {
          const dashboardnav = document.querySelector('#dashboardnav button');
          if (dashboardnav) {
            dashboardnav.click();
          }
          if (virtualclass.config.makeWebSocketReady) {
            ioAdapter.mustSend({ videoUl: { init: 'studentlayout' }, cf: 'videoUl' });
          }
        } else {
          const videoLayoutMessage = document.getElementById('messageLayoutVideo');
          if (videoLayoutMessage) {
            videoLayoutMessage.style.display = 'block';
          }
        }
      },

      reArrangeElements(order) {
        const container = document.getElementById('listvideo');
        const tmpdiv = document.createElement('div');
        tmpdiv.id = 'listvideo';
        tmpdiv.className = 'videos';
        const videos = this.getActiveVideos();
        let orderChange = false;
        for (let j = 0; j < videos.length; j++) {
          if (order.indexOf(videos[j].fileuuid) <= -1) {
            order.push(videos[j].fileuuid);
            orderChange = true;
          }
        }
        if (orderChange) {
          virtualclass.videoUl.order = order;
          virtualclass.videoUl.sendOrder(virtualclass.videoUl.order);
          orderChange = false;
        }

        for (let i = 0; i < order.length; i++) {
          const elem = document.getElementById(`linkvideo${order[i]}`);
          if (elem) {
            tmpdiv.appendChild(elem);
          }
        }

        container.parentNode.replaceChild(tmpdiv, container);
      },

      getActiveVideos() {
        const activeVideos = [];
        for (let i = 0; i < virtualclass.videoUl.videos.length; i++) {
          if (!Object.prototype.hasOwnProperty.call(virtualclass.videoUl.videos[i], 'deleted')) {
            activeVideos.push(virtualclass.videoUl.videos[i]);
          }
        }
        return activeVideos;
      },

      requestOrder() {
        virtualclass.vutil.requestOrder('vid',
          (response) => {
            if (response === 'Error') {
              // console.log('page order retrieve failed');
            } else if (typeof response !== 'undefined' && response != undefined) {
              virtualclass.videoUl.order = [];
              virtualclass.videoUl.order = response;
              if (virtualclass.videoUl.order.length > 0) {
                virtualclass.videoUl.reArrangeElements(virtualclass.videoUl.order); // 1
              }
            }
          });
      },

      updateOrder() {
        const activeVideos = this.getActiveVideos();
        if (activeVideos.length !== this.order.length) {
          const videos = activeVideos.map(video => video.fileuuid);
          this.order = videos;
        }
        this.sendOrder(this.order);
      },

      afterUploadVideo(id, xhr, res) {
        if (res.success) {
          this.updateOrder();
          virtualclass.videoUl.order.push(virtualclass.gObj.file.uuid);
          virtualclass.videoUl.sendOrder(virtualclass.videoUl.order);
          virtualclass.videoUl.showUploadMsz('Video uploaded successfully', 'alert-success');
          const popup = document.querySelector('.congrea #VideoDashboard #videoPopup');
          if (popup) {
            if (!popup.classList.contains('uploadSuccess')) {
              popup.classList.add('uploadSuccess');
            }
          }

          for (let i = 0; i < virtualclass.gObj.uploadingFiles.length; i++) {
            const fileObj = {};
            fileObj.filename = `${virtualclass.gObj.uploadingFiles[i].name} (Processing...)`;
            fileObj.fileuuid = virtualclass.gObj.uploadingFiles[i].uuid;
            fileObj.filetype = 'video';
            fileObj.key_room = `${virtualclass.gObj.sessionInfo.key}_${virtualclass.gObj.sessionInfo.room}`;
            fileObj.noVideo = true;
            // console.log(`File uploading ${fileObj.filename}`);
            this.afterUploadFile(fileObj);
          }
          virtualclass.gObj.uploadingFiles = [];
          virtualclass.serverData.pollingStatus().then(() => { virtualclass.videoUl.UI.rawVideoList(); });
        } else {
          virtualclass.videoUl.showUploadMsz('video upload failed', 'alert-error');
        }

        const msz = document.querySelector('#videoPopup .qq-upload-list-selector.qq-upload-list');
        if (msz) {
          msz.style.display = 'none';
        }
      },

      showUploadMsz(msg, type) {
        const mszCont = document.querySelector('#VideoDashboard #uploadMsz');
        const alertMsz = document.querySelector('#VideoDashboard #uploadMsz .alert');
        if (alertMsz) {
          alertMsz.parentNode.removeChild(alertMsz);
        }
        const elem = document.createElement('div');
        elem.className = 'alert  alert-dismissable';
        elem.classList.add(type);
        elem.innerHTML = msg;
        mszCont.appendChild(elem);

        const btn = document.createElement('button');
        btn.className = 'close';
        btn.setAttribute('data-dismiss', 'alert');
        btn.innerHTML = '&times';
        btn.addEventListener('click', () => {
          const msz = document.querySelector('#uploadMsz');
          if (msz) {
            msz.style.display = 'none';
          }
          const popup = document.querySelector('.congrea #VideoDashboard #videoPopup');
          if (popup) {
            popup.classList.remove('uploadSuccess');
          }
          elem.parentNode.removeChild(elem);
        });
        elem.appendChild(btn);
      },

      retrieveOrder() {
        this.requestOrder();
      },


      afterUploadFile(vidObj) {
        const idPostfix = vidObj.fileuuid;
        // var docId = 'docs' + doc;
        this.pages[idPostfix] = new virtualclass.page('videoList', 'video', 'virtualclassVideo', 'videoUl', vidObj.status, vidObj.filetype);
        if (vidObj.filetype === 'video_yts') {
          const ytsId = virtualclass.videoUl.getVideoId(vidObj.URL);
          virtualclass.videoUl.UI.fetchYtsTitle(vidObj, ytsId);
        }
        this.pages[idPostfix].init(idPostfix, vidObj.filename);
        this.videoDisplayHandler(vidObj);
        const vid = document.getElementById(`linkvideo${vidObj.fileuuid}`);
        const title = document.getElementById(`videoTitle${vidObj.fileuuid}`);
        if (title) {
          title.innerHTML = vidObj.filename;
        }

        const controlElem = vid.getElementsByClassName('status')[0];

        if (Object.prototype.hasOwnProperty.call(vidObj, 'disabled')) {
          this._disable(vidObj.fileuuid);
          if (vid) {
            vid.classList.add('disable');
            vid.dataset.status = 0;
          }
        } else {
          this._enable(vidObj.fileuuid);
          if (vid) {
            vid.classList.add('enable');
            vid.dataset.status = 1;
          }
        }
        controlElem.dataset.status = vid.dataset.status;
        this.calculateHeight();

        if (Object.prototype.hasOwnProperty.call(vidObj, 'noVideo')) {
          vid.classList.add('noVideo');
        }
      },


      calculateHeight() {
        const element = document.querySelector('#listvideo');
        $('.qq-uploader-selector').css({
          minHeight: element.offsetHeight,
        });
      },

      showVideos() {
        if (roles.hasControls()) {
          virtualclass.videoUl.showVideoList();
        }

        if (virtualclass.videoUl.videoUrl) {
          virtualclass.videoUl.activeVideoClass(virtualclass.videoUl.videoId);
          virtualclass.vutil.showFinishBtn();
        }
      },

      showVideoList() {
        const elem = document.getElementById('listvideo');
        if (elem) {
          for (let i = 0; i < elem.childNodes.length - 1; i++) {
            elem.childNodes[i].parentNode.removeChild(elem.childNodes[i]);
          }
        }
        if (virtualclass.videoUl.videos && virtualclass.videoUl.videos.length) {
          virtualclass.videoUl.videos.forEach((vidObj, i) => {
            if (!Object.prototype.hasOwnProperty.call(vidObj, 'deleted')) {
              const elem = document.querySelector(`#linkvideo${vidObj.fileuuid}`);
              if (elem != null) {
                elem.classList.remove('noVideo');
              }
              virtualclass.videoUl.afterUploadFile(vidObj);
            }
          });
        }
        // virtualclass.vutil.makeElementDeactive('#VideoDashboard .qq-uploader-selector.qq-uploader.qq-gallery');


        // virtualclass.vutil.removeFinishBtn();
        virtualclass.vutil.makeElementActive('#listvideo');
        const video = document.querySelector('.congrea #listvideo .linkvideo.singleVideo');
        const link = document.querySelector('.congrea #listvideo .linkvideo');
        if (virtualclass.videoUl.videos.length === 1 && !video) {
          link.classList.add('singleVideo');
        } else if (virtualclass.videoUl.videos.length > 1 && video) {
          video.classList.remove('singleVideo');
        }
      },

      videoDisplayHandler(vidObj) {
        const video = document.getElementById(`mainpvideo${vidObj.fileuuid}`);
        if (video && !vidObj.status) {
          if (!video.classList.contains('playDisable')) {
            video.classList.add('playDisable');
          }
        } else if (video && video.classList.contains('playDisable')) {
          video.classList.remove('playDisable');
        }
        if (video) {
          video.addEventListener('click', () => {
            virtualclass.videoUl.isPaused = false;
            if (vidObj.filetype === 'video_yts') {
              virtualclass.videoUl.yts = true;
              virtualclass.videoUl.online = false;
            } else if (vidObj.filetype === 'video_online') {
              virtualclass.videoUl.yts = false;
              virtualclass.videoUl.online = true;
            } else {
              virtualclass.videoUl.yts = false;
              virtualclass.videoUl.online = false;
            }

            if (vidObj.urls) {
              const url = vidObj.urls.main_video;
              virtualclass.videoUl.UI.displayVideo(vidObj.fileuuid, url);
              virtualclass.videoUl.activeVideoClass(vidObj.fileuuid);

              const toStd = {};
              toStd.content_path = url;
              toStd.id = vidObj.fileuuid;
              toStd.title = vidObj.filename;
              toStd.type = vidObj.filetype;

              virtualclass.videoUl.videoToStudent(toStd);
              virtualclass.videoUl.videoId = vidObj.fileuuid;
              virtualclass.vutil.showFinishBtn();
              virtualclass.dashBoard.close();
            }
          });
        }
      },

      activeVideoClass(currId) {
        const controlCont = document.getElementsByClassName('controlCont');
        for (let i = 0; i < controlCont.length; i++) {
          if (controlCont[i].classList.contains('removeCtr')) {
            controlCont[i].classList.remove('removeCtr');
          }
        }
        const controlElem = document.getElementById(`controlContvideo${currId}`);
        if (controlElem && !controlElem.classList.contains('removeCtr')) {
          controlElem.classList.add('removeCtr');
        }

        const linkvideos = document.getElementsByClassName('linkvideo');
        for (let i = 0; i < linkvideos.length; i++) {
          if (linkvideos[i].classList.contains('playing')) {
            linkvideos[i].classList.remove('playing');
          }
        }

        const currentVideo = document.getElementById(`linkvideo${currId}`);
        if (currentVideo && !currentVideo.classList.contains('playing')) {
          currentVideo.classList.add('playing');
        }
      },

      destroyPl() {
        if (typeof virtualclass.videoUl.player === 'object') {
          if (virtualclass.currApp === 'ScreenShare') {
            ioAdapter.mustSend({ video: 'destroyPl', cf: 'video' });
          }
          console.log('==== video player ready dispose');
          // virtualclass.videoUl.player.dispose();
          virtualclass.videoUl.player.destroyPlayer();
        }
      },


      _rearrange(order) {
        this.order = order;
        this.reArrangeElements(order); // 2, rearrange
        this.sendOrder(this.order);
      },

      async _editTitle(id, title, videotype) {
        var form_data = new FormData();
        const data = {
          lc_content_id: id, action: 'edit', title, user: virtualclass.gObj.uid,
        };
        var form_data = new FormData();
        for (const key in data) {
          form_data.append(key, data[key]);
          // console.log(data[key]);
        }

        await this.vxhr.post(`${window.webapi}&user=${virtualclass.gObj.uid}&methodname=update_content_video`, form_data)
          .then((response) => {
            const elem = document.getElementById(`videoTitle${id}`);
            if (elem) {
              elem.innerHTML = title;
              elem.style.display = 'inline';
              // virtualclass.videoUl.order=[];
              if (virtualclass.videoUl.videos && virtualclass.videoUl.videos.length) {
                virtualclass.videoUl.videos.forEach((video) => {
                  if (video.id === id) {
                    video.title = title;
                  }
                });
              }
            }
          })
          .catch((error) => {
            console.error('Request failed with error ', error);
          });
      },

      sendOrder(order) {
        const type = 'vid';
        virtualclass.vutil.sendOrder(type, order);
      },


      /*
       * message  handled at student's end
       * and new order to save in dabase
       * @param message from teacher

       */
      onmessage(msg) {
        if (typeof msg.videoUl === 'string') {
          if (msg.videoUl === 'play') {
            this.handlePlayEvent(msg, msg.play);
          } else if (msg.videoUl === 'pause') {
            this.handlePauseEvent(msg);
            // virtualclass.videoUl.player.lastSeek = msg.currTime;
            // this.pauseVideo();
            // virtualclass.videoUl.isPaused = true;
          } else if (msg.videoUl === 'destroyPlayer') {
            virtualclass.videoUl.destroyPlayer();
          } else if (msg.videoUl === 'enterFullScreen') {
            virtualclass.videoUl.enterFullScreen();
          } else if (msg.videoUl === 'exitFullScreen') {
            virtualclass.videoUl.exitFullScreen();
          } else if (msg.videoUl === 'videoDelete') {
            const playerCont = document.querySelector('#videoPlayerCont');
            if (playerCont) {
              playerCont.style.display = 'none';
              const msz = document.querySelector('#messageLayoutVideo');
              if (msz) {
                msz.style.display = 'block';
              }
              virtualclass.videoUl.videoId = null;
              virtualclass.videoUl.videoUrl = null;
              const video = document.querySelector('.congrea #dispVideo video');
              const ytube = document.querySelector('.congrea #dispVideo iframe');
              const cont = video || ytube;
              if (cont) {
                cont.setAttribute('src', '');
              }
            }
          }
        } else {
          this.onmessageObj(msg);
        }
      },

      /*
       * message  handled at student's end
       * and new order to save in dabase
       * @param message from teacher

       */

      onmessageObj(msg) {
        if (msg.videoUl.type) {
          if (msg.videoUl.type === 'video_yts') {
            virtualclass.videoUl.yts = true;
            virtualclass.videoUl.online = false;
          } else if (msg.videoUl.type === 'video_online') {
            virtualclass.videoUl.online = true;
            virtualclass.videoUl.yts = false;
          } else {
            virtualclass.videoUl.yts = false;
            virtualclass.videoUl.online = false;
          }
        }

        if (Object.prototype.hasOwnProperty.call(msg.videoUl, 'init')) {
          // virtualclass.videoUl.yts=false;
          virtualclass.videoUl.rec = msg.videoUl;
          // console.log(virtualclass.videoUl.rec);
          if (msg.videoUl.init === 'studentlayout') {
            virtualclass.makeAppReady('Video', undefined, msg.videoUl);
            // console.log('====> Video play 1');
            const msz = document.getElementById('messageLayoutVideo');
            if (msz) {
              msz.style.display = 'block';
            }
          } else if (Object.prototype.hasOwnProperty.call(msg.videoUl.init, 'videoUrl')) {
            virtualclass.videoUl.videoId = msg.videoUl.init.id;
            virtualclass.videoUl.videoUrl = msg.videoUl.init.videoUrl;
            virtualclass.videoUl.UI.displayVideo(msg.videoUl.init.id, msg.videoUl.init.videoUrl, msg.videoUl.startFrom);
          }
        } else if (Object.prototype.hasOwnProperty.call(msg.videoUl, 'content_path')) {
          virtualclass.videoUl.videoId = msg.videoUl.id;
          virtualclass.videoUl.videoUrl = msg.videoUl.content_path;
          virtualclass.videoUl.title = msg.videoUl.title;
          virtualclass.videoUl.UI.displayVideo(msg.videoUl.id, virtualclass.videoUl.videoUrl);
        } else if (Object.prototype.hasOwnProperty.call(msg.videoUl, 'play')) {
          this.handlePlayEvent(msg, msg.videoUl.play);
        }
      },

      calculateVideoTime(time) {
        const lastPlayTime = virtualclass.vutil.UTCtoLocalTimeToSeconds(time);
        const currentTime = (new Date().getTime());
        return (currentTime - lastPlayTime) / 1000;
      },

      handlePlayEvent(msg, playTime) {
        virtualclass.videoUl.lastSeek = playTime;
        if (msg.videoTime) {
          virtualclass.videoUl.lastSeek += this.calculateVideoTime(msg.videoTime);
        }
        console.log('====> last seek ', virtualclass.videoUl.lastSeek);
        this.playVideo();
        virtualclass.videoUl.isPaused = false;
        // console.log('====> seek pause false ', virtualclass.videoUl.isPaused);
      },

      handlePauseEvent(msg) {
        virtualclass.videoUl.lastSeek = msg.currTime;
        console.log('====> last seek ', virtualclass.videoUl.lastSeek);
        this.pauseVideo();
        virtualclass.videoUl.isPaused = true;

      },

      enablePlayer() {
        const stdVideo = document.getElementById('videoPlayerCont');
        if (stdVideo) {
          stdVideo.style.display = 'block';
        }
      },

      disablePlayer() {
        const stdVideo = document.getElementById('videoPlayerCont');
        if (stdVideo) {
          stdVideo.style.display = 'none';
        }
      },

      destroyPlayer() {
        virtualclass.videoUl.player.dispose();
      },

      playVideo() {
        // console.log('====> seek play', virtualclass.videoUl.player.lastSeek / 60);
        console.log('====> Video 1 play', virtualclass.videoUl.lastSeek);
        virtualclass.videoUl.player.currentTime(virtualclass.videoUl.lastSeek);
        virtualclass.videoUl.player.play();
      },

      pauseVideo() {
        console.log('====> Video 2 pause', virtualclass.videoUl.lastSeek);
        virtualclass.videoUl.player.currentTime(virtualclass.videoUl.lastSeek);
        //console.log('====> seek pause ', virtualclass.videoUl.player.lastSeek / 60);
        virtualclass.videoUl.player.pause();
        virtualclass.videoUl.isPaused = true;
      },

      /*
       * to play next video from the  the playlist
       * @param index  of next enabled video in the videolist array
       */

      autoPlayList(index) {
        const videos = this.getActiveVideos();
        const nextIndex = index;
        // var nextId = virtualclass.videoUl.order[index + 1];
        let currVideoObj = this.findNextObj(nextIndex);
        if (typeof currVideoObj !== 'object') {
          const nxIndex = currVideoObj;
          if (nxIndex < videos.length) {
            currVideoObj = this.autoPlayList(nxIndex);
          }
        } else {
          const toStd = {};
          toStd.id = currVideoObj.fileuuid;
          toStd.title = currVideoObj.filename;
          toStd.type = currVideoObj.filetype;

          if (!virtualclass.videoUl.listEnd) {
            if (currVideoObj.filetype === 'video_online') {
              virtualclass.videoUl.yts = false;
              virtualclass.videoUl.online = true;
              //  virtualclass.videoUl.UI.displayVideo(currVideoObj.id, currVideoObj.URL);
              virtualclass.videoUl.UI.displayVideo(currVideoObj.fileuuid, currVideoObj.URL);
              virtualclass.videoUl.videoToStudent(currVideoObj);
              this.activeVideoClass(currVideoObj.id);
              toStd.content_path = currVideoObj.URL;
            } else {
              virtualclass.videoUl.online = false;
              if (currVideoObj.filetype === 'video_yts') {
                virtualclass.videoUl.yts = true;
                virtualclass.videoUl.UI.displayVideo(currVideoObj.fileuuid, currVideoObj.URL);
                toStd.content_path = currVideoObj.URL;
              } else {
                virtualclass.videoUl.yts = false;
                virtualclass.videoUl.UI.displayVideo(currVideoObj.fileuuid, currVideoObj.urls.main_video);
                toStd.content_path = currVideoObj.urls.main_video;
              }
              virtualclass.videoUl.videoToStudent(toStd);
            }

            if (virtualclass.videoUl.player) {
              virtualclass.videoUl.player.ready(function () {
                const myPlayer = this;
                // console.log('====> seek play ', virtualclass.videoUl.lastSeek);
                myPlayer.play();
              });
            }
            this.activeVideoClass(currVideoObj.fileuuid);
          }
        }
      },
      /*
       * to find next video from the videolist

       */
      findNextObj(index) {
        const nextId = this.findNextVideo(index);
        let currVideoObj = false;
        const videos = this.getActiveVideos();
        for (let i = 0; i < videos.length; i++) {
          // for (var j in virtualclass.videoUl.videos[i]) {
          if (videos[i].fileuuid === nextId) {
            const vid = document.getElementById(`linkvideo${videos[i].fileuuid}`);
            if (vid.getAttribute('data-status') === '1') {
              currVideoObj = videos[i];
              break;
            }
            currVideoObj = index + 1;
            break;
          }
        }
        return currVideoObj;
      },

      findNextVideo(index) {
        const list = document.querySelectorAll('#listvideo .linkvideo');
        if (index < list.length) {
          return list[index].getAttribute('data-rid');
        }
        return false;
      },

      /*
       * to disable  video in the videolist
       */

      _disable(_id) {
        const linkvideo = document.querySelector(`#linkvideo${_id}`);
        linkvideo.classList.add('playDisable');
        const video = document.getElementById(`mainpvideo${_id}`);
        video.style.opacity = 0.3;
        video.style.pointerEvents = 'none';

        if (virtualclass.videoUl.videos && virtualclass.videoUl.videos.length) {
          virtualclass.videoUl.videos.forEach((elem, i) => {
            if (elem.fileuuid == _id) {
              elem.disabled = 0;
              elem.status = 0;
            }
          });
        }
      },

      /*
       * to enable  video in the videolist
       */
      _enable(_id) {
        const linkvideo = document.querySelector(`#linkvideo${_id}`);
        linkvideo.classList.remove('playDisable');


        const video = document.getElementById(`mainpvideo${_id}`);
        if (video) {
          video.style.opacity = 1;
          video.style.pointerEvents = 'auto';
          if (virtualclass.videoUl.videos && virtualclass.videoUl.videos.length) {
            virtualclass.videoUl.videos.forEach((elem, i) => {
              if (elem.fileuuid == _id) {
                delete (elem.disabled);
                elem.status = 1;
              }
            });
          }
        }
      },

      /*
       * to delete  video from list and from the database
       */
      _delete(id) {
        const data = {
          uuid: id,
          action: 'delete',
          page: 0,
        };
        const videoid = id;
        const url = virtualclass.api.UpdateDocumentStatus;
        const that = this;
        // virtualclass.xhrn.sendFormData({uuid:videoid}, url, function (msg) {
        //     that.afterDeleteCallback(msg)
        // });

        virtualclass.xhrn.vxhrn.post(url, data).then((msg) => {
          that.afterDeleteCallback(msg.data, id);
        });
      },

      afterDeleteCallback(msg, id) {
        if (msg != 'ERROR') {
          const type = 'saved';
          const elem = document.getElementById(`linkvideo${id}`);
          if (elem) {
            elem.parentNode.removeChild(elem);
            // if current playing video is deleted
            if (virtualclass.videoUl.videoId === id) {
              const playerCont = document.querySelector('#videoPlayerCont');
              if (playerCont) {
                playerCont.style.display = 'none';
                ioAdapter.mustSend({ videoUl: 'videoDelete', cf: 'videoUl' });
                virtualclass.videoUl.videoId = null;
                virtualclass.videoUl.videoUrl = null;
                const video = document.querySelector('.congrea #dispVideo video');
                const ytube = document.querySelector('.congrea #dispVideo iframe');
                const cont = video || ytube;
                if (cont) {
                  cont.setAttribute('src', '');
                }
                virtualclass.vutil.removeFinishBtn();
              }
            }

            if (virtualclass.videoUl.videos && virtualclass.videoUl.videos.length) {
              virtualclass.videoUl.videos.forEach((video) => {
                if (video.fileuuid === id) {
                  const index = virtualclass.videoUl.videos.indexOf(video);
                  if (index >= 0) {
                    virtualclass.videoUl.videos.splice(index, 1);
                    // console.log(virtualclass.videoUl.videos);
                  }
                }
              });
            }

            const idIndex = virtualclass.videoUl.order.indexOf(id);
            if (idIndex >= 0) {
              virtualclass.videoUl.order.splice(idIndex, 1);
              // console.log(virtualclass.videoUl.order);
              // virtualclass.videoUl.xhrOrderSend(virtualclass.videoUl.order);
              virtualclass.videoUl.sendOrder(virtualclass.videoUl.order);
            }
            if (!virtualclass.videoUl.videos.length) {
              virtualclass.vutil.removeFinishBtn();
            } else if (virtualclass.videoUl.videos.length == 1) {
              var video = document.querySelector('.congrea #listvideo .linkvideo');
              if (video) {
                video.classList.add('singleVideo');
              }
            }
          }
        }
      },

      // xhrOrderSend(order) {
      //   const data = { order: order.toString() };
      //   const url = virtualclass.api.UpdateRoomMetaData;
      //   virtualclass.xhrn.vxhrn.post(url, data).then(() => {
      //     if (virtualclass.config.makeWebSocketReady) {
      //       virtualclass.serverData.syncAllData().then(() => {
      //         virtualclass.videoUl.UI.rawVideoList();
      //       });
      //     }
      //   });
      // },

      videoToStudent(videoObj) {
        ioAdapter.mustSend({ videoUl: videoObj, cf: 'videoUl', videoTime: virtualclass.vutil.localToUTC() });
      },

      getVideoId(url) {
        const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const m = url.match(rx);
        if (m != null && m.length > 1) {
          const r = m[1].substring(0, 11);
          if (r.length == 11) {
            return r;
          }
        }
        return false;
      },

      /*
       * this object is for user interface
       */
      UI: {
        id: 'virtualclassVideo',
        class: 'bootstrap virtualclass',
        /*
         * Creates container for the video and appends the container before audio widget
         */
        container() {
          let videoCont = document.getElementById('virtualclassVideo');
          if (!videoCont) {
            const control = !!roles.hasAdmin();
            const data = { control };
            const template = JST[`${virtualclass.gObj.tempPrefix}/videoupload/videoupload.hbs`];
            // $('#virtualclassAppLeftPanel').append(template(data));
            virtualclass.vutil.insertAppLayout(template(data));

            videoCont = document.getElementById(this.id);
          }
          if (!roles.hasControls()) {
            const msz = document.getElementById('messageLayoutVideo');
            if (msz) {
              msz.style.display = 'block';
            }
          }
        },
        createYoutubeUrlCont(cont) {
          const list = document.createElement('div');
          list.id = 'listvideo';
          cont.appendChild(list);
        },

        displayVideo(vidId, videoUrl, startFrom) {
          if (typeof virtualclass.videoUl.player === 'object') {
            if (Object.prototype.hasOwnProperty.call(virtualclass.videoUl.player, 'dispose')) {
              // virtualclass.videoUl.player.dispose();
              virtualclass.videoUl.player.destroyPlayer();
            }
          }
          virtualclass.videoUl.videoUrl = videoUrl;
          virtualclass.videoUl.videoId = vidId;
          // var videourl = "https://dev.muzioapp.com.s3-website-us-east-1.amazonaws.com/content/ourMuzeVid1.webm";
          let videoPlayerCont = document.getElementById('videoPlayerCont');
          if (videoPlayerCont) {
            videoPlayerCont.style.display = 'block';
          } else {
            virtualclass.videoUl.UI.container();
            videoPlayerCont = document.getElementById('videoPlayerCont');
          }
          const ply = document.querySelector('iframe#player');
          if (ply) {
            ply.remove();
          }

          virtualclass.videoUl.UI.switchDisplay(videoPlayerCont, videoUrl);
          virtualclass.videoUl.UI.videojsPlayer(videoUrl, vidId, startFrom);
          virtualclass.modal.hideModal();
        },

        videojsPlayer(videoUrl, vidId, startFrom) {
          if (!virtualclass.videoUl.player) {
            virtualclass.videoUl.player = videojs('dispVideo'); // TODO, generating error need to handle
            if (roles.hasControls()) {
              if (!($('.vjs-autoPlay-button').length)) {
                virtualclass.videoUl.UI.appendAutoPlayButton(virtualclass.videoUl.player);
              }
              const autoPlayBtn = document.getElementById('autoPlayListBtn');
              if (autoPlayBtn) {
                // autoPlayBtn.innerHTML = virtualclass.videoUl.innerHtml;
                autoPlayBtn.className = virtualclass.videoUl.autoPlayClass;
              }
            }

            console.log('==== video player ready 1', virtualclass.videoUl.player);
            virtualclass.videoUl.UI.attachPlayerHandler(virtualclass.videoUl.player, vidId, videoUrl);
          }

          virtualclass.videoUl.UI.onEndedHandler(virtualclass.videoUl.player, vidId, videoUrl);
          virtualclass.videoUl.UI.setPlayerUrl(virtualclass.videoUl.player, videoUrl, startFrom);
        },

        attachPlayerHandler(player) {
          if (!this.attachPlayer) {
            this.attachPlayer = true;
            // console.log('Attach video player');
            player.on('pause', (e) => {
              // console.log('paused');
              if (roles.hasControls()) {
                ioAdapter.mustSend({ videoUl: 'pause', cf: 'videoUl', currTime : player.currentTime()});
              }
              virtualclass.videoUl.isPaused = true;
            });

            // console.log('====> seek play init ');
            player.on('play', (e) => {
              if (roles.hasControls()) {
                ioAdapter.mustSend({ videoUl: { play: player.currentTime() }, cf: 'videoUl', videoTime: virtualclass.vutil.localToUTC() });
              }
              virtualclass.videoUl.isPaused = false;
              // console.log('====> seek pause false ', virtualclass.videoUl.isPaused);
            });
          }
        },


        switchDisplay(videoCont, videoUrl) {
          const dispVideo = document.getElementById('dispVideo');
          if (dispVideo) {
            dispVideo.style.display = 'block';
          } else {
            virtualclass.videoUl.UI.createVideoElem(videoCont);
          }

          const msz = document.getElementById('messageLayoutVideo');
          if (typeof videoUrl === 'undefined') {
            videoCont.style.display = 'none';
            if (msz) {
              msz.style.display = 'block';
            }
          } else {
            videoCont.style.display = 'block';
            if (msz) {
              msz.style.display = 'none';
            }
          }
        },

        createVideoElem(videoCont) {
          const video = '<video id="dispVideo" class="video-js" autoplay controls  preload="auto" data-setup="{}" >';
          videoCont.insertAdjacentHTML('beforeend', video);
          // $(videoCont).append(video);
          const vn = document.createElement('p');
          vn.setAttribute('class', 'vjs-no-js');
          const videoElem = document.getElementById('dispVideo');
          videoElem.appendChild(vn);

          const a = document.createElement('a');
          a.setAttribute('href', 'https://videojs.com/html5-video-support/');
          a.setAttribute('target', '_blank');
          a.innerHTML = 'supports HTML5 video';
          vn.appendChild(a);
        },

        setPlayerUrl(player, videoUrl, startFrom) {
          console.log('====> Video 0 start');
          if (startFrom == undefined && virtualclass.videoUl.startTime) {
            startFrom = virtualclass.videoUl.startTime;
          }

          if (player.poster_) {
            player.poster_ = '';
          }

          const dispVideo = document.querySelector('#dispVideo');
          if (virtualclass.videoUl.yts) {
            dispVideo.setAttribute('data-setup', '{ techOrder: [youtube],"preload": "auto"}');
            player.src({ type: 'video/youtube', src: videoUrl });
            console.log('====> Video 1 b Finished youtube');
          } else if (virtualclass.videoUl.online) {
            dispVideo.setAttribute('data-setup', '{"preload": "auto" }');
            player.src({ type: 'video/webm', src: videoUrl });
            player.src({ type: 'video/mp4', src: videoUrl });
            console.log('====> Video 1 b Finished uploaded');
          } else {
            dispVideo.setAttribute('data-setup', '{"preload": "auto"}');
            player.src({ type: 'application/x-mpegURL', withCredentials: true, src: videoUrl });
            console.log('====> Video 1 b normal');
          }

          player.any('loadstart', () => {
            virtualclass.videoUl.alreadySetPlayerUrl = true;
            if (virtualclass.videoUl.isPaused) {
              if (virtualclass.videoUl.lastSeek) {
                virtualclass.videoUl.player.currentTime(virtualclass.videoUl.lastSeek);
              }
              player.pause();
              console.log('====> Video 2 finished pause');
            } else if (virtualclass.system.device === 'desktop') { // TODO, WHY only on desktop
              if (virtualclass.videoUl.lastSeek) {
                virtualclass.videoUl.player.currentTime(virtualclass.videoUl.lastSeek);
              }
              player.play();
              console.log('====> Video 2 finished play');
            }
          });
        },

        //  todo  modify
        appendAutoPlayButton(player) {
          // var on = '<div>auto play is on</div>'
          // var off = '<div>auto play is off</div>'
          // virtualclass.videoUl.innerHtml = virtualclass.videoUl.autoPlayFlag ? on : off;
          virtualclass.videoUl.autoPlayClass = virtualclass.videoUl.autoPlayFlag ? 'vjs-autoPlay-button vjs-control on' : 'vjs-autoPlay-button vjs-control off';

          player.controlBar.addChild('button', {
            el: videojs.createEl('button', {
              className: 'vjs-autoPlay-button vjs-control on',
              // innerHTML: '<div>auto play</div>',
              id: 'autoPlayListBtn',
              role: 'button',
              title: 'Auto Play',
              onclick() {
                virtualclass.videoUl.UI.autoPlayFn(this);
              },
            }),
          });
        },
        autoPlayFn(cthis) {
          if (cthis.classList.contains('off')) {
            virtualclass.videoUl.autoPlayFlag = 1;
            cthis.classList.remove('off');
            cthis.classList.add('on');
            // cthis.innerHTML = "auto play is on"
            cthis.style.color = 'green';
          } else {
            virtualclass.videoUl.autoPlayFlag = 0;
            cthis.classList.remove('on');
            cthis.classList.add('off');
            // cthis.innerHTML = "auto play is off";
            cthis.style.color = 'red';
          }
        },
        onEndedHandler(player, vidId, videoUrl) {
          player.off('ended');
          player.on('ended', (e) => {
            virtualclass.videoUl.UI.onEnded(player, vidId, videoUrl);
          });
        },

        onEnded(player, vidId, videoUrl) {
          // player.reset();
          const dispVideo = document.querySelector('#dispVideo');
          if (virtualclass.videoUl.yts) {
            dispVideo.setAttribute('data-setup', '{ techOrder: [youtube],controls: true,}');
            player.src({ type: 'video/youtube', src: videoUrl });
          } else if (virtualclass.videoUl.online) {
            dispVideo.setAttribute('data-setup', '{"preload": "auto", "controls": true, }');
            player.src({ type: 'video/webm', src: videoUrl });
            player.src({ type: 'video/mp4', src: videoUrl });
          } else {
            dispVideo.setAttribute('data-setup', '{"preload": "auto", "controls": true, }');
            player.src({ type: 'application/x-mpegURL', withCredentials: true, src: videoUrl });
          }
          // console.log(`ended${vidId}`);


          const list = document.querySelectorAll('#listvideo .linkvideo');
          let index = 0;
          for (let i = 0; i < list.length; i++) {
            if (list[i].getAttribute('data-rid') == vidId) {
              index = i;
              break;
            }
          }


          if (virtualclass.videoUl.autoPlayFlag) {
            if (player.poster_) {
              player.poster_ = '';
            }
            if (virtualclass.videoUl.findNextVideo(index + 1)) {
              virtualclass.videoUl.autoPlayList(index + 1, list);
            } else {
              virtualclass.videoUl.UI.autoVideoPause();
            }
          } else {
            virtualclass.videoUl.UI.autoVideoPause();
          }
        },

        autoVideoPause() {
          virtualclass.videoUl.isPaused = true;
          const paused = virtualclass.videoUl.isPaused;
          virtualclass.videoUl.listEndPause = true;
          virtualclass.videoUl.player.on('play', () => {
            if (virtualclass.videoUl.listEndPause) {
              // console.log('==== Video is paused');
              virtualclass.videoUl.player.pause();
              virtualclass.videoUl.listEndPause = false;
            }
          });
        },


        inputUrl() {
          const videocont = document.getElementById('congreaShareVideoUrlCont');
          const studentMessage = document.getElementById('messageLayout');
          if (studentMessage != null) {
            studentMessage.parentNode.removeChild(studentMessage);
          }

          const submitURL = document.getElementById('submitURL');
          submitURL.addEventListener('click', () => {
            const input = document.querySelector('.congrea #videourl');
            const isURL = virtualclass.videoUl.UI.validateURL(input.value);
            if (isURL) {
              const playing = document.querySelector(' #listvideo .playing');
              if (playing) {
                playing.classList.remove('playing');
              }
              const ctr = document.querySelector(' #listvideo .removeCtr');
              if (ctr) {
                ctr.classList.remove('removeCtr');
              }

              //                            $('.congrea #listvideo .playing').removeClass('playing');
              //                            $('.congrea #listvideo .removeCtr').removeClass('removeCtr');
              // slice(1, -1) is used to remove first and last character
              const id = virtualclass.vutil.createHashString(input.value) + virtualclass.vutil.randomString(32).slice(1, -1);

              virtualclass.videoUl.UI.saveYtsUrl(id);
            }
          });

          const upload = document.querySelector('.congrea #newVideoBtn');
          if (upload) {
            upload.addEventListener('click', () => {
              var uploader = document.querySelector('.congrea #congreavideoContBody');
              uploader.style.display = 'block';
              var uploader = document.querySelector('.congrea #listvideo');
              uploader.style.display = 'none';
            });
          }
        },

        saveYtsUrl(id) {
          const input = document.querySelector('.congrea #videourl');
          const vidObj = {};
          vidObj.uuid = id;
          vidObj.URL = input.value;
          vidObj.title = input.value;

          const url = virtualclass.api.addURL;

          const videoId = virtualclass.videoUl.getVideoId(input.value);

          if (typeof videoId === 'boolean') {
            vidObj.type = 'video_online';
          } else {
            vidObj.type = 'video_yts';
          }
          virtualclass.xhrn.vxhrn.post(url, vidObj).then(() => {
            virtualclass.videoUl.updateOrder();
            virtualclass.videoUl.order.push(vidObj.uuid);

            // TODO, Critical this need be re-enable
            virtualclass.videoUl.sendOrder(virtualclass.videoUl.order);
            if (virtualclass.config.makeWebSocketReady) {
              virtualclass.serverData.syncComplete = false;
              virtualclass.serverData.syncAllData().then(() => {
                virtualclass.videoUl.UI.rawVideoList();
              });
            }
          });

          document.querySelector('.congrea #videourl').value = '';
        },


        fetchYtsTitle(vidObj, videoid) {
          $.getJSON('https://www.googleapis.com/youtube/v3/videos', {
            key: 'AIzaSyCt1SQWwanpucKGFlzytu-mDdr6vRKzJGA',
            part: 'snippet,statistics',
            id: videoid,
          }, (data) => {
            let title = '';
            if (data.items.length === 0) {
              // console.log('video not found');
            } else {
              title = data.items[0].snippet.title;
              virtualclass.videoUl.UI.setYtsTitle(vidObj, title);
            }
          }).fail((jqXHR, textStatus, errorThrown) => {
            // console.log('unable to fetch you tube title');
            return 'ERROR';
          });
        },
        validateURL(url) {
          const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
          if (res == null) {
            virtualclass.popup.validateurlPopup('video');
            return false;
          } return true;
        },
        setYtsTitle(vidObj, title) {
          const yts = document.querySelector(`#listvideo #videoTitle${vidObj.fileuuid}`);
          if (yts) {
            yts.innerHTML = title;
          }
        },

        /*
         * removeing the video url container
         */
        removeinputURL() {
          const inputContainer = document.getElementById('youtubeUrlContainer');
          if (inputContainer != null) {
            inputContainer.parentNode.removeChild(inputContainer);
          }
        },
        popup() {
          const dropArea = document.querySelector('#congreavideoContBody');
          if (dropArea && dropArea.lastChild != null) {
            dropArea.removeChild(dropArea.lastChild);
          }
          const elemArr = ['congreavideoContBody', 'congreaShareVideoUrlCont'];
          const upload = {};
          const currPlayed = document.querySelector('#listvideo .playing');
          if (currPlayed) {
            this.currPlaying = currPlayed.getAttribute('data-rid');
          }

          upload.validation = ['mp4', 'avi', 'wmv', 'mov', 'webm', 'mkv', 'vob', 'mpeg'];
          upload.cb = virtualclass.videoUl.afterUploadVideo;
          upload.cthis = 'video';
          upload.multiple = false;
          upload.maxSize = 512 * 1000 * 1000; // 512 MB

          upload.requesteEndPoint = `${window.webapi}&methodname=file_save&live_class_id=${virtualclass.gObj.congCourse}&status=1&content_type_id=2&user=${virtualclass.gObj.uid}`;
          upload.wrapper = document.getElementById(elemArr[0]);
          virtualclass.fineUploader.uploaderFn(upload);

          if (!virtualclass.serverData.syncComplete) {
            virtualclass.serverData.syncAllData().then(() => {
              virtualclass.videoUl.UI.rawVideoList();
            });
          } else if (!virtualclass.videoUl.videos.length) {
            this.rawVideoList();
          } else {
            virtualclass.videoUl.showVideos();
            virtualclass.videoUl.reArrangeElements(virtualclass.videoUl.order);
          }

          const dropMsz = document.querySelector('#virtualclassCont.congrea #VideoDashboard .qq-uploader.qq-gallery');
          dropMsz.setAttribute('qq-drop-area-text', 'Drop videos here');

          const uploadMesssage = document.querySelector('#uploadMsz');
          const uploadMessageList = document.querySelector('#congreavideoContBody .qq-upload-list-selector.qq-upload-list');
          uploadMessageList.style.display = 'block';

          let upMsz = document.querySelector('#uploadMsz div');
          if (!upMsz) {
            upMsz = document.createElement('div');
            uploadMesssage.appendChild(upMsz);
          }
          upMsz.appendChild(uploadMessageList);
          const lists = document.querySelectorAll('#videoPopup #uploadMsz ul');
          // two ul not to be deleted(one is with li as a child and another recent):when we have started upload,
          // we change current app and after that return to video
          if (lists.length > 2) {
            for (let i = 0; i < lists.length - 1; i++) {
              if (!lists[i].querySelector('li')) {
                lists[i].parentNode.removeChild(lists[i]);
              }
            }
          }

          const btnUpload = document.querySelector('#uploadVideo');
          btnUpload.addEventListener('click', () => {
            uploadMesssage.style.display = 'block';
            const btn = document.querySelector('#videoPopup .qq-upload-list-selector.qq-upload-button input');
            btn.click();
          });
        },

        rawVideoList() {
          virtualclass.videoUl.videos = virtualclass.serverData.rawData.video;
          virtualclass.videoUl.showVideos();
          virtualclass.videoUl.retrieveOrder();
        },
      },
    };
  };
  window.videoUl = videoUl;
}(window));
