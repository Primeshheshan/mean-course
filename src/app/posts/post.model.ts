export class PostModel {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public imagePath: string,
    public creator: string,
  ) {}
}
