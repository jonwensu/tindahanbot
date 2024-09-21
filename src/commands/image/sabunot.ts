import { createCanvas } from "canvas";
import { MessageAttachment } from "discord.js";
import CommandGroup from "../../enums/CommandGroup";
import CommandBuilder from "../../helper/CommandBuilder";
import { getImage } from "../../util/CacheUtil";

const SABUNOT_IMG = `https://cdn.discordapp.com/attachments/765047137473265714/769803669875982366/Screen-Shot-2018-06-06-at-2.png?ex=66efb389&is=66ee6209&hm=ba5bb5cc29b9e6102d795553ef3fd8d35c79232bb9358d85623daa204d30bc52&`;

const WIDTH = 640;
const HEIGHT = 420;

const AVATAR_W = 60;
const AVATAR_H = 60;

const SABUNOTEE_W = 50;
const SABUNOTEE_H = 50;

const sabunoter = (w: number, h: number) => ({
  x: w * 0.1,
  y: h * 0.2,
});
const sabunotee = (w: number, h: number) => ({
  x: w * 0.04,
  y: h * 0.73,
});

export default CommandBuilder.build({
  category: CommandGroup.IMAGE.name,
  aliases: ["sb"],
  description: "Make sabunot someone",
  options: [
    {
      name: "target",
      description: "Ang kawawang sasabunutan",
      type: "USER",
      required: true,
    },
  ],
  slash: true,
  callback: async ({ user, args, guild, interaction, message }) => {
    const targetId = args[0];

    const target = guild?.members.cache.find(
      ({ user }) => user.id === targetId,
    );

    if (!target) return "Provide a target";

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    const background = await getImage(SABUNOT_IMG);
    const sabunoterAvatar = await getImage(
      user.displayAvatarURL({ format: "png" }),
    );
    const sabunoteeAvatar = await getImage(
      target.displayAvatarURL({ format: "png" }),
    );

    const sabunoterDim = sabunoter(WIDTH, HEIGHT);
    const sabunoteeDim = sabunotee(WIDTH, HEIGHT);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    const { x: t1x, y: t1y } = sabunoterDim;
    const { x: t2x, y: t2y } = sabunoteeDim;

    ctx.arc(
      t1x + AVATAR_W * 0.5,
      t1y + AVATAR_H * 0.5,
      AVATAR_W * 0.5,
      0,
      Math.PI * 2,
      true,
    );
    ctx.save();
    ctx.rotate((-30 * Math.PI) / 180);
    ctx.arc(
      t2x + SABUNOTEE_W * 0.5,
      t2y + SABUNOTEE_H * 0.5,
      SABUNOTEE_W * 0.5,
      0,
      Math.PI * 2,
      true,
    );
    ctx.restore();
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      sabunoterAvatar,
      sabunoterDim.x,
      sabunoterDim.y,
      AVATAR_W,
      AVATAR_H,
    );

    ctx.save();
    ctx.rotate((-30 * Math.PI) / 180);
    ctx.drawImage(
      sabunoteeAvatar,
      sabunoteeDim.x,
      sabunoteeDim.y,
      SABUNOTEE_W,
      SABUNOTEE_H,
    );

    ctx.restore();

    const attachment = new MessageAttachment(canvas.toBuffer(), "sabunot.png");
    await (interaction || message).reply({ files: [attachment] });
    return null;
  },
});
