/** eventsService */
export const eventsService = {
    triggerEvent,
    listenEvent,
    unlistenEvent,
    callbacks: {}
};

/**
 * @param {string} eventName
 * @param {*} data
 */
function triggerEvent(eventName, data = null) {
  if (this.callbacks[eventName]) {
    this.callbacks[eventName](data);
  }
}
  
/**
 * @param {string} eventName name of event
 * @param {string} id callback identifier
 * @param {Function} callback
 */
function listenEvent(eventName, callback) {
  this.callbacks[eventName] = callback;
}
  
/**
 * @param {string} eventName name of event
 * @param {string} id callback identifier
 */
function unlistenEvent(eventName) {
  delete this.callbacks[eventName];
}