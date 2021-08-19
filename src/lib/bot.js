// import {Telegram} from 'telegraf'
import TelegramBot from 'node-telegram-bot-api';


const CHANNEL_PUBLIC_ID = import.meta.env.VITE_LOCAL ? -1001544550528 : -1001518905562 

function notify (msg, channel = 'public' ) {

	CHANNEL_ID = channel === 'admin' ? -1001544550528 : CHANNEL_PUBLIC_ID

	const bot = new TelegramBot(import.meta.env.VITE_BOT_TOKEN, {polling: false});
	try {
		bot.sendMessage( CHANNEL_ID, msg, { parse_mode: 'Markdown'} )
	} catch (err) {
		console.log('Something went wrong when trying to send a Telegram notification', err);
	}	
}

export { notify }