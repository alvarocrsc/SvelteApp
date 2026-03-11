<script lang="ts">
	import AddUserModal from '$lib/components/modals/AddUserModal.svelte';
	import EditUserModal from '$lib/components/modals/EditUserModal.svelte';
	import type { User } from '$lib/types';
	import { toast } from 'svelte-sonner';

	let users = $state<User[]>([]);
	let loading = $state(true);
	let showAddUserModal = $state(false);
	let showEditUserModal = $state(false);
	let selectedUser = $state<User | null>(null);

	async function getUsers() {
		loading = true;
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		users = await response.json();
		loading = false;
	}

	function deleteUser(id: number) {
		if (confirm('Are you sure?')) {
			const user = users.find((user) => user.id === id);
			users = users.filter((user) => user.id !== id);
			toast.success('User deleted', { description: `${user?.name} was removed` });
		}
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
	<button class="btn-add" onclick={() => (showAddUserModal = true)}>
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
			toast.success('User added successfully!');
		}}
	/>
{/if}

{#if showEditUserModal && selectedUser}
	<EditUserModal
		user={selectedUser}
		onClose={() => {
			showEditUserModal = false;
			selectedUser = null;
		}}
		onSubmit={(updatedUser) => {
			users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
			showEditUserModal = false;
			selectedUser = null;
			toast.success('User updated successfully!');
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
				<th></th>
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
						<td>
							<div class="action-btns">
								<button
									class="btn-edit"
									onclick={() => {
										selectedUser = user;
										showEditUserModal = true;
									}}
								>
									<span class="material-symbols-outlined">edit</span>
									Edit
								</button>
								<button class="btn-delete" onclick={() => deleteUser(user.id)}>
									<span class="material-symbols-outlined">delete</span>
									Delete
								</button>
							</div>
						</td>
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

	.action-btns {
		display: flex;
		gap: 0.5rem;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background-color: #171717;
		color: #fff;
		border: none;
		padding: 0.8rem 1.25rem;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		transition:
			background-color 0.2s,
			box-shadow 0.2s;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.btn-add {
		margin-bottom: 1rem;
	}

	.btn-delete {
		padding: 0.7rem 1.25rem;
		min-width: 90px;
		justify-content: center;
		background-color: #dc3545;
		color: #fff;
	}

	.btn-edit {
		padding: 0.7rem 1.25rem;
		min-width: 90px;
		justify-content: center;
		background-color: #646cff;
		color: #fff;
	}

	.btn-add:hover {
		background-color: #2e2e2e;
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
	}

	.btn-delete:hover {
		background-color: #d2525f;
		box-shadow: 0 3px 8px rgba(220, 53, 69, 0.25);
	}

	.btn-edit:hover {
		background-color: #5a5ae0;
		box-shadow: 0 3px 8px rgba(100, 108, 255, 0.25);
	}

	.material-symbols-outlined {
		margin-left: -4px;
		font-size: 0.9rem;
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
		font-size: 0.85rem;
		transition: background-color 0.15s;
	}

	tr:hover {
		background-color: #f5f5f5;
	}
</style>
