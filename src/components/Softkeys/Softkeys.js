import css from "./Softkeys.module.css";
import { keys } from "../../config";

// Soft keys support only KaiOS devices. To interact with other devices
// we also attach mouse click handlers to the softkey panel.

// Dispatches keydown event to the target
//
const dispatchKeyDown = (key, target) => () => {
  const event = new KeyboardEvent('keydown', {
    key,
    view: window,
    bubbles: true,
    cancelable: true
  });

  target && target.current.dispatchEvent(event);
};

// Dispatches submit event to the target
//
const dispatchSubmit = target => () => {
  const event = new KeyboardEvent('submit', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  target.current.closest("form").dispatchEvent(event);
};

// We use mouse clicks to emulate pressing soft keys
// and send the events to the target element.
//
const Softkeys = ({ left, center, right, target }) => {
  return (
    <div className={css.softKeys}>
      <label className={css.left} onClick={dispatchKeyDown(keys.left, target)}>{left}</label>
      <label className={css.center} onClick={dispatchSubmit(target)}>{center}</label>
      <label className={css.right} onClick={dispatchKeyDown(keys.right, target)}>{right}</label>
    </div>
  );
};

export { Softkeys };
