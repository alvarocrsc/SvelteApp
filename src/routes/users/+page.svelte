<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<h1>Users</h1>

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
        {#each data.users as user}
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    h1 {
        color: #333;
        margin-bottom: 2rem;
    }

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    th, td {
        border: 1px solid #ddd;
        padding: 0.8rem;
        text-align: left;
    }

    th {
        padding: 1rem;
        background-color: #f2f2f2;
        font-weight: bold;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    tr:nth-child(even) {
        background-color: #f9f9f96d;
    }
</style>