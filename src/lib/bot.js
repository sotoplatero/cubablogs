// import {Telegram} from 'telegraf'
import TelegramBot from 'node-telegram-bot-api';

function notify (channel = 'public', msg) {
	
	const CHANNEL_ID = channel === 'admin' ? -1001544550528 : -1001544550528 

	const bot = new TelegramBot(import.meta.env.VITE_BOT_TOKEN, {polling: false});
	try {
		bot.sendMessage( CHANNEL_ID, msg, { parse_mode: 'Markdown'} )
	} catch (err) {
		console.log('Something went wrong when trying to send a Telegram notification', err);
	}	
}

export { notify }