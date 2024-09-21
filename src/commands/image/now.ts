import { createCanvas } from "canvas";
import { MessageAttachment } from "discord.js";
import { createEmbedMessage } from "../../util/MessageUtil";
import CommandGroup from "../../enums/CommandGroup";
import CommandBuilder from "../../helper/CommandBuilder";
import { getImage } from "../../util/CacheUtil";

type Dimensions = {
  width: number;
  height: number;
};

type Coordinates = {
  x: number;
  y: number;
};

type TargetType = {
  dimensions: Dimensions;
  coordinates: (w: number, h: number) => Coordinates;
};

type KissType = {
  [key: string]: {
    image: Dimensions & {
      url: string;
    };
    avatar: {
      target1: TargetType;
      target2: TargetType;
    };
  };
};

const KISS_IMG: KissType = {
  kith: {
    image: {
      url: `https://cdn.discordapp.com/attachments/765047137473265714/809791992845697096/hqdefault.png?ex=66ef7fd0&is=66ee2e50&hm=90d540510561a3401b8c2bd9138fb942bc5db187947cc619a23d409e038f43f8&`,
      width: 480,
      height: 360,
    },
    avatar: {
      target1: {
        dimensions: {
          width: 40,
          height: 40,
        },
        coordinates: (w, h) => ({
          x: w * 0.4,
          y: h * 0.4,
        }),
      },
      target2: {
        dimensions: {
          width: 40,
          height: 40,
        },
        coordinates: function (w, h) {
          return {
            x: w * 0.47,
            y: h * 0.4,
          };
        },
      },
    },
  },
  kiss: {
    image: {
      url: `https://cdn.discordapp.com/attachments/765047137473265714/809808983665279017/iu.png?ex=66ef8fa3&is=66ee3e23&hm=98247a30c089a6afe573e938a240d37ed90d4367b95cdf0926cd631e6b0b5209&`,
      width: 750,
      height: 585,
    },
    avatar: {
      target1: {
        dimensions: {
          width: 70,
          height: 70,
        },
        coordinates: (w, h) => ({
          x: w * 0.64,
          y: h * 0.5,
        }),
      },
      target2: {
        dimensions: {
          width: 85,
          height: 85,
        },
        coordinates: function (w, h) {
          return {
            x: w * 0.72,
            y: h * 0.57,
          };
        },
      },
    },
  },
};

export default CommandBuilder.build({
  category: CommandGroup.IMAGE.name,
  description: "Make two people kiss",
  options: [
    {
      name: "img",
      description: "Image Template",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "kiss",
          value: "kiss",
        },
        {
          name: "kith",
          value: "kith",
        },
      ],
    },
    {
      name: "x",
      description: "First participant for the kissing scene",
      type: "USER",
      required: true,
    },
    {
      name: "y",
      description: "Second participant for the kissing scene",
      type: "USER",
      required: true,
    },
  ],
  slash: true,
  callback: async ({ args, guild, interaction, message }) => {
    const [img, firstTargetId, secondTargetId] = args;

    const findMember = (id: string) =>
      guild?.members.cache.find(({ user }) => user.id === id);
    const firstTarget = findMember(firstTargetId);
    const secondTarget = findMember(secondTargetId);

    if (!firstTarget || !secondTarget) {
      return createEmbedMessage("RANDOM").setDescription("Target not found");
    }

    const template = KISS_IMG[img.toLowerCase()];
    const { image, avatar } = template;

    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    const background = await getImage(image.url);
    const firstTargetAvatar = await getImage(
      firstTarget.displayAvatarURL({ format: "png", size: 128 }),
    );
    const secondTargetAvatar = await getImage(
      secondTarget.displayAvatarURL({ format: "png", size: 128 }),
    );

    const target1Coords = avatar.target1.coordinates(image.width, image.height);
    const target2Coords = avatar.target2.coordinates(image.width, image.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const { x: t1x, y: t1y } = target1Coords;
    const { x: t2x, y: t2y } = target2Coords;
    const {
      target1: {
        dimensions: { width: t1Width, height: t1Height },
      },
      target2: {
        dimensions: { width: t2Width, height: t2Height },
      },
    } = avatar;
    ctx.arc(
      t1x + t1Width * 0.5,
      t1y + t1Height * 0.5,
      t1Width * 0.5,
      0,
      Math.PI * 2,
      true,
    );
    ctx.arc(
      t2x + t2Width * 0.5,
      t2y + t2Height * 0.5,
      t2Width * 0.5,
      0,
      Math.PI * 2,
      true,
    );
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      firstTargetAvatar,
      target1Coords.x,
      target1Coords.y,
      avatar.target1.dimensions.width,
      avatar.target1.dimensions.height,
    );
    ctx.drawImage(
      secondTargetAvatar,
      target2Coords.x,
      target2Coords.y,
      avatar.target2.dimensions.width,
      avatar.target2.dimensions.height,
    );

    const attachment = new MessageAttachment(canvas.toBuffer(), "kiss.png");
    await (interaction || message).reply({ files: [attachment] });
    return null;
  },
});
