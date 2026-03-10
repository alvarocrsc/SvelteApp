export async function load() {
    console.log('Loading users...');

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    console.log('Got', users.length, 'users');
    console.log('First user:', users[0]);

    return { users };
}