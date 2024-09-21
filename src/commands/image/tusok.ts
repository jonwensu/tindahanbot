import ImageBuilder, {
  Coordinates,
  Dimensions,
  ImageEntry,
} from "../../helper/image/ImageBuilder";
import UserImageEntry from "../../helper/image/UserImageEntry";
import CommandGroup from "../../enums/CommandGroup";
import CommandBuilder from "../../helper/CommandBuilder";
import { pick } from "../../util/RngUtil";

const BAKUNA_IMG = `https://cdn.discordapp.com/attachments/765047137473265714/802569014785736704/vaccine.png?ex=66ef96e4&is=66ee4564&hm=d75c976e7acb0705541c8eb70640dd4a08f282a654e42319ecaa1491e0610b5c&`;
const WIDTH = 1000;
const HEIGHT = 800;

type Bakuna = Record<
  string,
  {
    url: string;
    coordinates: Coordinates;
    dimensions: Dimensions;
  }
>;

const logoCoords: Coordinates = {
  x: 0.65,
  y: 0.05,
};

const bakunas: Bakuna = {
  pfizer: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802746796350373918/pfizer.png?ex=66ef93b6&is=66ee4236&hm=140ddedd264b46b79b504ee40095ac0c426d974381a2ca3b2a359a1ef5383414&",
    dimensions: {
      width: 0.1 * WIDTH,
      height: 0.1 * HEIGHT,
    },
    coordinates: logoCoords,
  },
  redhorse: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802747985032642610/redhorse.png?ex=66ef94d1&is=66ee4351&hm=87cbd7dae4301b2b137823ad0e385193d11310e5e71ac2a4af5b84bd0ddfb4e1&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.13,
    },
    coordinates: logoCoords,
  },

  vaseline: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802751826863718490/vaseline.png?ex=66ef9865&is=66ee46e5&hm=50de842fb805ee71e94472a2d8aa49c9a162fa48e40ce1f641a6d9a6cc59acbb&",
    dimensions: {
      width: WIDTH * 0.13,
      height: HEIGHT * 0.1,
    },
    coordinates: logoCoords,
  },
  shell: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802753042717868032/shell.png?ex=66ef9987&is=66ee4807&hm=e3ca8d01f0bf800988eba31f9049c70ea4d8215306461426d3062e63958a6b0d&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.12,
    },
    coordinates: logoCoords,
  },
  petron: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802753593315819520/petron.png?ex=66ef9a0b&is=66ee488b&hm=e8719778421442adfba8da56f5b93ed1968ec1dfea63edf2f1f06dd2277d9a07&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.13,
    },
    coordinates: logoCoords,
  },
  minola: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802755428316348446/minola.png?ex=66ef9bc0&is=66ee4a40&hm=17c214e5777aea4d0a37b8c86fffb6b73d02f03d1a6c151cd4dccb64d3f5f178&",
    dimensions: {
      width: WIDTH * 0.13,
      height: HEIGHT * 0.1,
    },
    coordinates: { ...logoCoords, x: 0.63 },
  },
  starbucks: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802755447756554250/starbucks.png?ex=66ef9bc5&is=66ee4a45&hm=1f85d34b043ba533c2c88788aee67392c4a5adf58eec6caaa0f7608f318d82cc&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.12,
    },
    coordinates: logoCoords,
  },
  coke: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802755486268653578/coke.png?ex=66ef9bce&is=66ee4a4e&hm=d8b1305985f8b86bfcfdd774efbc125eb565ce2a11438532ae60b907a64db44f&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.12,
    },
    coordinates: logoCoords,
  },
  pepsi: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802755491049504788/pepsi.png?ex=66ef9bcf&is=66ee4a4f&hm=6d0bf84436cf27ab2fc78d776e5fa14e28eb297a92e44e819e207faf3c124fc3&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.1,
    },
    coordinates: logoCoords,
  },
  rc: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802755504769728512/rc.png?ex=66ef9bd2&is=66ee4a52&hm=2236227cca6f588eb7bf3c0f93cde59d6ed5b438a530f7aaab0bba9087856230&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.12,
    },
    coordinates: logoCoords,
  },
  aot: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802755576752766976/aot.png?ex=66ef9be3&is=66ee4a63&hm=c85b2490005c18d06e9bd017839d3ab851102d22c81c2defbe6824e44f9758d1&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.14,
    },
    coordinates: logoCoords,
  },
  melkti: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802791676867379251/melkti.png?ex=66efbd82&is=66ee6c02&hm=67bb44f1e322b78cdf0ea0bbbe65346a21100b3c2d51d3ac581e39c4527f6d8d&",
    dimensions: {
      width: WIDTH * 0.1,
      height: HEIGHT * 0.13,
    },
    coordinates: logoCoords,
  },
  bj: {
    url: "https://cdn.discordapp.com/attachments/765047137473265714/802914160357933116/bukojuan-1.png?ex=66ef86d5&is=66ee3555&hm=ff077b255ba2c527a8b90fb2a840eb9258ce64d3edad9c1ea47a0ee8fd0847ac&",
    dimensions: {
      width: WIDTH * 0.13,
      height: HEIGHT * 0.1,
    },
    coordinates: logoCoords,
  },
};

export default CommandBuilder.build({
  category: CommandGroup.IMAGE.name,
  description: "TOSOKEN!",
  options: [
    {
      name: "target",
      description: "Yung totosoken",
      type: "USER",
      required: true,
    },
    {
      name: "bakuna",
      description: "Yung itutusok",
      type: "STRING",
      choices: Object.keys(bakunas).map((b) => ({ name: b, value: b })),
      required: false,
    },
  ],
  slash: true,
  callback: async ({ args, guild, interaction }) => {
    const [targetId, bakunaKey = pick(Object.keys(bakunas))] = args;

    const target = guild?.members.cache.find(
      ({ user }) => user.id === targetId,
    )?.user;

    if (!target) return "Provide a target";

    await interaction.deferReply();

    const pickedBakuna = bakunas[bakunaKey.toLowerCase()];
    const {
      dimensions: bakunaDims,
      coordinates: bakunaCoords,
      url: bakunaUrl,
    } = pickedBakuna;

    const brandImg = new ImageEntry(bakunaUrl, bakunaDims, bakunaCoords, false);
    const targetImg = new UserImageEntry(
      target,
      HEIGHT,
      { x: 0, y: 0 },
      false,
      1024,
    );
    const bakunaImg = new ImageEntry(
      BAKUNA_IMG,
      { width: WIDTH, height: HEIGHT },
      { x: 0, y: 0 },
    );

    const builder = new ImageBuilder({ width: WIDTH, height: HEIGHT }, [
      targetImg,
      bakunaImg,
      brandImg,
    ]);

    const attachment = await builder.render();

    await interaction.followUp({ files: [attachment] });
    return null;
  },
});
