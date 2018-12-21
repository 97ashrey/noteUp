import uuid from 'uuid';

const state = {
  normal: 'NORMAL',
  archived: 'ARCHIVED',
  deleted: 'DELETED'
}

class NoteData {
  constructor(title,body){
    this.id = uuid();
    this.title = title;
    this.body = body;
    this.color = "default";
    this.cTime = new Date();
    this.mTime = new Date();
    this.dTime = null;
    this.state = NoteData.State().normal;
  }

  static State(){
    return state;
  }
}

export default NoteData;