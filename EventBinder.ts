import {EventBinding} from './types/types';

export class EventBinder {
    public bindings: Array<EventBinding> = [];

    public addEvent(element: EventBinding['element'], type: EventBinding['type'], handler: EventBinding['handler']): void {
        element.addEventListener(type, handler);
        this.bindings.push({element, type, handler});
    }

    public removeEventAll(): void {
        this.bindings.forEach(({element, type, handler}: EventBinding) => {
            element.removeEventListener(type, handler);
        });
    }
}