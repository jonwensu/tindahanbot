import { MessageAttachment, User } from "discord.js";
import UserImageEntry from "../image/UserImageEntry";
import ImageBuilder from "../image/ImageBuilder";
import BaseKurotTemplate from "./BaseKurotTemplate";

const BG_URL = `https://cdn.discordapp.com/attachments/765047137473265714/810809483189552164/SPOILER_FqtqF4SW_fAbKmWMNeOxjw2Fcustom-Custom_Size___ScreenShot2019-07-10at3.png?ex=66ef3eec&is=66eded6c&hm=3b592fb90875c6477eb99cb9f31456e596c25c3b14e063a982f053dcd247c547&`;
export default class NsfwKurotTemplate extends BaseKurotTemplate {
  constructor(target: User) {
    super(target, true);
  }
  async render(user: User): Promise<MessageAttachment> {
    const authorImg = new UserImageEntry(user, 100, {
      x: 0.2,
      y: 0.15,
    });
    const targetImg = new UserImageEntry(this.target, 100, {
      x: 0.7,
      y: 0.12,
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
