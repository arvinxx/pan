import { EventEmitter } from 'events';
declare global {
  interface Window {
    kitchenEmitter: EventEmitter;
  }
}

window.kitchenEmitter = new EventEmitter();

export default window.kitchenEmitter;
