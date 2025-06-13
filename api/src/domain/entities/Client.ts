import { BaseEntity } from "../../shared/base/BaseEntiry";

export class Client extends BaseEntity {
  createdAt: Date;
  updatedAt: Date;

  constructor(
    public name: string,
    public email: string,
    public phone: string,
  ) {
    super();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}