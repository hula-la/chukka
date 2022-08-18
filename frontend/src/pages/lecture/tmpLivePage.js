<>
  {this.state.session === undefined ? (
    <div id="join">
      <div id="img-div">
        <img alt="OpenVidu logo" />
      </div>
      <div id="join-dialog" className="jumbotron vertical-center">
        <h1> Join a video session </h1>
        <form
          className="form-group"
          onSubmit={(e) => {
            e.preventDefault();
            this.joinSession();
          }}
        >
          <p>
            <label>Participant: </label>
            <input
              className="form-control"
              type="text"
              id="myUserName"
              value={this.state.myUserName}
              onChange={this.handleChangeMyUserName}
              required
            />
          </p>
          <p>
            <label> Session: </label>
            <input
              className="form-control"
              type="text"
              id="mySessionId"
              value={this.state.mySessionId}
              onChange={this.handleChangeMySessionId}
              required
            />
          </p>
          <p className="text-center">
            <input
              className="btn btn-lg btn-success"
              name="commit"
              type="submit"
              value="JOIN"
            />
          </p>
        </form>
      </div>
    </div>
  ) : null}
  {this.state.session !== undefined &&
  this.state.mySessionId === this.state.myUserName ? (
    <div className="container" id="container">
      <ToolbarComponent
        sessionId={mySessionId}
        user={localUser}
        showNotification={this.state.messageReceived}
        camStatusChanged={this.camStatusChanged}
        micStatusChanged={this.micStatusChanged}
        screenShare={this.screenShare}
        stopScreenShare={this.stopScreenShare}
        toggleFullscreen={this.toggleFullscreen}
        switchCamera={this.switchCamera}
        leaveSession={this.leaveSession}
        toggleChat={this.toggleChat}
      />

      <DialogExtensionComponent
        showDialog={this.state.showExtensionDialog}
        cancelClicked={this.closeDialogExtension}
      />
      <div className="layouttest">
        <div id="layout" className="bounds" style={{ width: '50%' }}>
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                <StreamComponent
                  user={localUser}
                  handleNickname={this.nicknameChanged}
                />
              </div>
            )}
          {this.state.subscribers.map((sub, i) => (
            <div
              key={i}
              className="OT_root OT_publisher custom-class"
              id="remoteUsers"
            >
              <StreamComponent
                user={sub}
                streamId={sub.streamManager.stream.streamId}
              />
            </div>
          ))}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className="OT_root OT_publisher custom-class"
                style={chatDisplay}
              >
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  ) : null}
  {this.state.session !== undefined &&
  this.state.mySessionId !== this.state.myUserName ? (
    <div className="container" id="container">
      <ToolbarComponent
        sessionId={mySessionId}
        user={localUser}
        showNotification={this.state.messageReceived}
        camStatusChanged={this.camStatusChanged}
        micStatusChanged={this.micStatusChanged}
        screenShare={this.screenShare}
        stopScreenShare={this.stopScreenShare}
        toggleFullscreen={this.toggleFullscreen}
        switchCamera={this.switchCamera}
        leaveSession={this.leaveSession}
        toggleChat={this.toggleChat}
      />

      <DialogExtensionComponent
        showDialog={this.state.showExtensionDialog}
        cancelClicked={this.closeDialogExtension}
      />
      <div className="layouttest">
        <div id="layout" className="bounds" style={{ width: '50%' }}>
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                <StreamComponent
                  user={localUser}
                  handleNickname={this.nicknameChanged}
                />
              </div>
            )}
          {this.state.subscribers.map((sub, i) => (
            <div
              key={i}
              className="OT_root OT_publisher custom-class"
              id="remoteUsers"
            >
              <StreamComponent
                user={sub}
                streamId={sub.streamManager.stream.streamId}
              />
            </div>
          ))}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className="OT_root OT_publisher custom-class"
                style={chatDisplay}
              >
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  ) : null}
</>;
