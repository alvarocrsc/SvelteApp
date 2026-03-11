<script lang="ts">
	interface Props {
		onSubmit: (user: any) => void;
		onClose: () => void;
	}

	const { onSubmit, onClose }: Props = $props();

	let name = $state('');
	let username = $state('');
	let email = $state('');
	let city = $state('');

	function handleSubmit() {
		const newUser = {
			name,
			username,
			email,
			address: { city }
		};
		onSubmit(newUser);
		onClose();
	}
</script>

<div
	class="backdrop"
	role="presentation"
	onclick={onClose}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
>
	<div
		class="modal"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<h3>Add User</h3>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<label for="name">
				Name:
				<input id="name" type="text" bind:value={name} />
			</label>
			<label for="username">
				Username:
				<input id="username" type="text" bind:value={username} />
			</label>
			<label for="email">
				Email:
				<input id="email" type="email" bind:value={email} />
			</label>
			<label for="city">
				City:
				<input id="city" type="text" bind:value={city} />
			</label>
			<div class="buttons">
				<button class="submit" type="submit" disabled={!name || !username || !email || !city}
					>Submit</button
				>
				<button type="button" onclick={onClose}>Cancel</button>
			</div>
		</form>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h3 {
		align-self: center;
		font-size: 1.6rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.85rem;
	}

	input {
		padding: 0.6rem 0.75rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 0.95rem;
		outline: none;
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
	}

	input:focus {
		border-color: #646cff;
		box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.15);
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
	}

	button {
		margin-top: 1rem;
		padding: 0.8rem 1.25rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.8rem;
		letter-spacing: 0.02em;
	}

	.submit {
		background-color: #171717;
		color: #fff;
		font-weight: 500;
		transition:
			background-color 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
