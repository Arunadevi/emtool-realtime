/**
 * Options for the Realtime loader.
 */
var realtimeOptions = {
  /**
   * Client ID from the console.
   */
  clientId: '509986836118-ovgff4oirilvn05cdvarpi6dcpap20kr.apps.googleusercontent.com',

  /**
   * The ID of the button to click to authorize. Must be a DOM element ID.
   */
  authButtonElementId: 'authorizeButton',

  /**
   * Function to be called when a Realtime model is first created.
   */
  initializeModel: initializeModel,

  /**
   * Autocreate files right after auth automatically.
   */
  autoCreate: true,

  /**
   * The name of newly created Drive files.
   */
  defaultTitle: "Embodied Making Analysis.emb",

  /**
   * The MIME type of newly created Drive Files. By default the application
   * specific MIME type will be used:
   *     application/vnd.google-apps.drive-sdk.
   */
  newFileMimeType: null, // Using default.

  /**
   * Function to be called every time a Realtime file is loaded.
   */
  onFileLoaded: onFileLoaded,

  /**
   * Function to be called to inityalize custom Collaborative Objects types.
   */
  registerTypes: null, // No action.

  /**
   * Function to be called after authorization and before loading files.
   */
  afterAuth: null // No action.
}

/**
 * Start the Realtime loader with the options.
 */
function startRealtime() {
  var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
  realtimeLoader.start();
}
