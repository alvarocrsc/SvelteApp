<script lang="ts">
	import AddUserModal from '$lib/components/modals/AddUserModal.svelte';

	interface User {
		id: number;
		name: string;
		username: string;
		email: string;
		address: { city: string };
	}

	let users = $state<User[]>([]);
	let loading = $state(true);
	let showAddUserModal = $state(false);

	async function getUsers() {
		loading = true;
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		users = await response.json();
		loading = false;
	}

	$effect(() => {
		getUsers();
	});
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<h1>Users</h1>

<div class="actions">
	<button onclick={() => (showAddUserModal = true)}>
		<span class="material-symbols-outlined"> add_circle </span>
		Add user
	</button>
</div>

{#if showAddUserModal}
	<AddUserModal
		onClose={() => (showAddUserModal = false)}
		onSubmit={(user) => {
			const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
			users = [...users, { ...user, id: nextId }];
		}}
	/>
{/if}

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Username</th>
				<th>Email</th>
				<th>City</th>
			</tr>
		</thead>
		<tbody>
			{#if loading}
				<tr>
					<td colspan="5">Loading users...</td>
				</tr>
			{:else}
				{#each users as user}
					<tr>
						<td>{user.id}</td>
						<td>{user.name}</td>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{user.address.city}</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	h1 {
		color: #333;
		margin-bottom: 2rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		width: fit-content;
		background-color: #007bff;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 5px;
		cursor: pointer;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.material-symbols-outlined {
		margin-left: -4px;
		font-size: 1.25rem;
	}

	.table-wrapper {
		overflow-x: auto;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		border-radius: 10px;
		overflow: auto;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	th,
	td {
		padding: 0.8rem 1rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		padding: 1rem;
		background-color: #f2f2f2;
		font-weight: bold;
	}

	tr {
		font-size: 0.9rem;
		transition: background-color 0.15s;
	}

	tr:hover {
		background-color: #f5f5f5;
	}
</style>
