import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import CommandGroup from '../../enums/CommandGroup';
import DiscordApiService from '../../services/DiscordApiService';
import { AsyncCommandRunType } from '../../typings';
import { createEmbedMessage } from '../../util/MessageUtil';
import { getRandomColor, pick } from '../../util/RngUtil';

export default class EightBallCommand extends Command {
	discordApiService: DiscordApiService;
	constructor(client: CommandoClient) {
		super(client, {
			name: '8ball',
			memberName: '8ball',
			hidden: true,
			patterns: [new RegExp(/^(aling[\s]+)?nena[\s]*[,]?[\s]*/, 'i')],
			group: CommandGroup.FUN.name,
			description:
				'Tanungin si Aling Nena ng mga bagay-bagay na bumabagabag sayo',
			throttling: {
				usages: 2,
				duration: 5,
			},
		});

		this.discordApiService = new DiscordApiService();
	}

	async run(message: CommandoMessage): AsyncCommandRunType {
		const items = (await this.client.provider.get(
			message.guild,
			'cmd-8ball-answers'
		)) as string[];
		const answer = pick(items).toUpperCase();
		const embed = createEmbedMessage(getRandomColor()).setDescription(
			`🔮 ${answer}`
		);

		return message.say(embed);
	}
}
