// src/stores/content.js
import { writable } from 'svelte/store'

let storedConfig = []

if (typeof window !== 'undefined') {
	storedConfig = JSON.parse( localStorage.getItem('config') )
}

export const config = writable( storedConfig || [] )

if (typeof window !== 'undefined') {
	config.subscribe( (value) => {
		localStorage.setItem('config', JSON.stringify(value) )
	})
}
