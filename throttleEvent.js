/**
 * throttleEvent
 * Used to limit events that can be fired in rapid succession. 
 * This can prevent an event like onresize or onscroll from thrashing the UI.
 *
 * @arg {function} func - This is the actual event handler to be passed on
 * @arg {number} ms     - The optional delay time in milliseconds (throttling)
 * @return {function}   - The timeout function that is triggered by the event listner on each event call
 */
export let throttleEvent = (func, ms) => {
  const DELAY = ms || 250;
  var timeout;
  var timestamp = performance.now();
  return event => {
    timeout = requestAnimationFrame( currentEventTime => {
      if ((currentEventTime - timestamp) >= DELAY) {
        timestamp = currentEventTime;
        func(event);
      } else {
        cancelAnimationFrame(timeout);
      }
    });
  };
}
