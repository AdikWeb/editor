export default class CEvent {
    static add(ev,el, call){
        el.addEventListener(ev, call);
    }
}