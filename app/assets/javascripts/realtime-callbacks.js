// Temporary variables
var posid=0, elemid=0, x=0;

/*gapi.drive.realtime.load(docId, onLoaded, function(model) {
});*/

/** Call back configured to register types */
function registerTypes() {
  console.log("Registering types...")
  var VizDataModel = function() {}
  VizDataModel.prototype.positions = gapi.drive.realtime.custom.collaborativeField('positions');
  VizDataModel.prototype.relations = gapi.drive.realtime.custom.collaborativeField('relations');
  /*
  Add a new position item to the list
  */
  VizDataModel.prototype.addPosition = function(position) {
    console.log("Adding pos:")
    console.log(position)
    this.positions.push(position);
    console.log('Position added locally, current count:' +
        this.positions.length);
  };
  VizDataModel.prototype.getPositions = function() {
    return this.positions.toArray();
  };
  gapi.drive.realtime.custom.registerType(VizDataModel, 'VizDataModel');
  gapi.drive.realtime.custom.setInitializer(VizDataModel, doInitialize);
}

/**
Callback in the event of the collaborative data being changed  
Best Practice - Update UIs from change listeners
Collaborative data models may change without warning as a result of 
edits from other collaborators. A well-written collaborative app must 
attach listeners to its data model to update the UI when collaborative 
edits are received. Whenever possible, all UI updates (even UI updates 
caused by changes from the current, local user) should be done from data 
model change event listeners, because then there is a single code path for 
UI updates.

There are some circumstances where it is necessary to detect the difference 
between a locally-initiated data model change and a remotely-initiated data
model change. In those cases UI updates should still be done from change 
listeners, but listener code should check the isLocal property of change 
events so that local changes can be ignored. See Handle Events for more 
detailed information on event handling.
*/ 
function doValueChanged (){
  console.log("Model value changed...")
}

/**
 * The initializer is called exactly once in the lifetime of an object, 
 * immediately after the object is first created. When that object is reloaded
 * in the future, the initializer is not executed; instead, the object is
 * populated by loading saved data from the server. Initializer methods may 
 * take parameters, so the initial object state can be set up at creation time.   
 */
 function doInitialize() {  
  var model = gapi.drive.realtime.custom.getModel(this);
  this.positions = model.createList()
  console.log("Initialize object the first time it is created")
 }

/**
 * This function is called the first time that the Realtime model is created
 * for a file. This function should be used to initialize any values of the
 * model. 
 * 'at'param model {gapi.drive.realtime.Model} the Realtime root model object.
 */
function initializeModel(model) {
  /* Once the document has been loaded, we can create instances of the custom object 
  by calling create on the model with either the class or the string name used to 
  register the type. */
  vizdata = model.create('VizDataModel');
  console.log("Initial model state for new project has been created")
  /*After creating the VizDataModel object, we can now assign it to an object in the 
  hierarchy (in this case, the root) as follows */
  model.getRoot().set('vizdata', vizdata);  
}

/**
 * This function is called when the Realtime file has been loaded. It should
 * be used to initialize any user interface components and event handlers
 * depending on the Realtime model. In this case, create a text control binder
 * and bind it to our string model that we created in initializeModel.
 * 'at'param doc {gapi.drive.realtime.Document} the Realtime document.
 */
function onFileLoaded(doc) {
  vizdata = doc.getModel().getRoot().get('vizdata');
  vizdata.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, doValueChanged);
  var addButton = document.getElementById('addPos');
  addButton.onclick = function(e) {
    var position = {posId:posid, x:x,y:0, elementId:elemid}
    posid = posid +1
    x= x+1
    elemid = elemid + 2
    vizdata.addPosition(position)
  };

  //------------------ sample code - to be removed
  /*var string = doc.getModel().getRoot().get('text');

  // Keeping one box updated with a String binder.
  var textArea1 = document.getElementById('editor1');
  gapi.drive.realtime.databinding.bindString(string, textArea1);

  // Keeping one box updated with a custom EventListener.
  var textArea2 = document.getElementById('editor2');
  var updateTextArea2 = function(e) {
    textArea2.value = string;
  };
  string.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, updateTextArea2);
  string.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, updateTextArea2);
  textArea2.onkeyup = function() {
    string.setText(textArea2.value);
  };
  updateTextArea2();

  // Enabling UI Elements.
  textArea1.disabled = false;
  textArea2.disabled = false;*/

  // Add logic for undo button.
  /*var model = doc.getModel();
  var undoButton = document.getElementById('undoButton');
  var redoButton = document.getElementById('redoButton');

  undoButton.onclick = function(e) {
    model.undo();
  };
  redoButton.onclick = function(e) {
    model.redo();
  };
*/
  // Add event handler for UndoRedoStateChanged events.
  /*var onUndoRedoStateChanged = function(e) {
    undoButton.disabled = !e.canUndo;
    redoButton.disabled = !e.canRedo;
  };*/
  //model.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, onUndoRedoStateChanged);
}