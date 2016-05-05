import {throttleEvent} from 'throttleEvent.js';

/**
 * Custom breakpoint event using the onresize event
 */
let onBreakpointChange = new CustomEvent("breakpointchange", {
  detail: {
    size: undefined,
    small: () => window.matchMedia("(max-width: 400px)").matches,
    middle: () => window.matchMedia("(min-width: 400px) AND (max-width: 800px)").matches,
    large: () => window.matchMedia("(min-width: 800px)").matches
  }
});

let dispatchBreakpointChange = event => {
  let size = onBreakpointChange.detail.size;

  if (onBreakpointChange.detail.small()) {
    onBreakpointChange.detail.size = 'small';
  } else if (onBreakpointChange.detail.middle()) {
    onBreakpointChange.detail.size = 'middle';
  } else if (onBreakpointChange.detail.large()) {
    onBreakpointChange.detail.size = 'large';
  }
  if (size !== onBreakpointChange.detail.size) {
    document.dispatchEvent(onBreakpointChange);
  }

}
document.addEventListener('breakpointchange', event => {
  document.body.dataset.viewport = event.detail.size;
});
window.addEventListener('resize', throttleEvent(dispatchBreakpointChange, 200));

