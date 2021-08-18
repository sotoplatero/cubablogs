// import {Telegram} from 'telegraf'
import TelegramBot from 'node-telegram-bot-api';
const CHANNEL_ID = -1001518905562 

function notify (msg) {
	const bot = new TelegramBot(import.meta.env.VITE_BOT_TOKEN, {polling: false});
	try {
		bot.sendMessage( CHANNEL_ID, msg, { parse_mode: 'Markdown'} )
	} catch (err) {
		console.log('Something went wrong when trying to send a Telegram notification', err);
	}	
}

export { notify }