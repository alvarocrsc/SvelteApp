<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>

<div>
	<button onclick={() => setLocale('en')}>en</button>
	<button onclick={() => setLocale('es')}>es</button>
</div>

<p>
	{m.top_sharp_mole_earn()}

	<a
		href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
		target="_blank">{m.polite_major_bat_twirl()}</a
	>

	{m.hour_these_snail_harbor()}
</p>
