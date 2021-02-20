export class Doc {
  id: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;
  user_id: string;

  constructor(id, data) {
    this.id = id;
    this.title = data.title;
    this.content = data.content;
    this.created = new Date(data.created);
    this.updated = new Date(data.updated);
    this.user_id = data.user_id;
  }
}
