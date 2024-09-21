import { MessageAttachment, User } from "discord.js";
import UserImageEntry from "../image/UserImageEntry";
import ImageBuilder from "../image/ImageBuilder";
import BaseKurotTemplate from "./BaseKurotTemplate";

const BG_URL = `https://cdn.discordapp.com/attachments/765047137473265714/810912770404253706/EbP3GYjXsAE--4m.png?ex=66ef9f1e&is=66ee4d9e&hm=fda5ee8c12529b832c29a702c042dc970ed82b5a076f8d4168bb119f3d54ab21&`;
export default class BoyKurotTemplate extends BaseKurotTemplate {
  async render(user: User): Promise<MessageAttachment> {
    const authorImg = new UserImageEntry(user, 170, {
      x: 0.64,
      y: 0.12,
    });
    const targetImg = new UserImageEntry(this.target, 160, {
      x: 0.15,
      y: 0.22,
    });

    const builder = new ImageBuilder(
      { width: 750, height: 412 },
      [authorImg, targetImg],
      BG_URL,
    );

    const attachment = await builder.render();

    return attachment;
  }
}
