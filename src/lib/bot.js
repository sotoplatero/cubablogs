// import TelegramBot from 'node-telegram-bot-api';

const CHANNEL_PUBLIC_ID = -1001518905562 
const CHANNEL_ADMIN_ID = -1001544550528 
const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN

// const bot = new TelegramBot( BOT_TOKEN, { polling: false } );

function notify(msg, channel = 'public') {

	CHANNEL_ID = (channel === 'public')  ? CHANNEL_PUBLIC_ID : CHANNEL_ADMIN_ID

	const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHANNEL_ID}&text=${encodeURIComponent(msg)}`
	try {
		fetch(url)
		  .then(response => response.json())
		  .then(data => console.log(data));

		// bot.sendMessage( CHANNEL_ID, msg, { parse_mode: 'Markdown'} )
	} catch (err) {
		console.log('Something went wrong when trying to send a Telegram notification', err);
	}	
}

export { notify }