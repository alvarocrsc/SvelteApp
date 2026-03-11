<script lang="ts">
	interface Props {
		onConfirm: () => void;
		onClose: () => void;
	}
	const { onConfirm, onClose }: Props = $props();
</script>

<div class="backdrop">
	<div class="modal">
		<h3>Delete user</h3>
		<p>Are you sure you want to delete the user?</p>
		<div class="buttons">
			<button class="confirm" onclick={onConfirm}>
				<span class="material-symbols-outlined">delete</span>
				Delete
			</button>
			<button type="button" onclick={onClose}>Cancel</button>
		</div>
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

	h3 {
		align-self: center;
		font-size: 1.6rem;
	}

	p {
		margin-top: -12px;
	}

	.buttons {
		margin-top: 6px;
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		min-width: 90px;
		padding: 0.7rem 1.25rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.8rem;
		letter-spacing: 0.02em;
	}

	button:hover {
		background-color: #e0e0e0;
	}

	.confirm {
		background-color: #dc3545;
		color: #fff;
	}

	.confirm:hover {
		background-color: #d2525f;
		box-shadow: 0 3px 8px rgba(220, 53, 69, 0.25);
	}

	.material-symbols-outlined {
		margin-left: -4px;
		font-size: 0.9rem;
	}
</style>
