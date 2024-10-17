// Sample JavaScript code demonstrating a mix of async/await, classes, recursion, error handling, and external API interaction

class User {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    updateEmail(newEmail) {
        if (this.isValidEmail(newEmail)) {
            this.email = newEmail;
        } else {
            throw new Error('Invalid Email Address');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Email: ${this.email}`;
    }
}

// Utility function to simulate a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetching data from an external API with async/await
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching data failed:', error);
        throw error; // Rethrow to be handled by the calling function
    }
}

// Recursive function for calculating factorial
function factorial(n) {
    if (n < 0) throw new Error('Negative numbers not allowed');
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Main function that performs multiple tasks asynchronously
async function main() {
    try {
        console.log('Starting main function...');

        // Create a new User object
        let user = new User('Alice', 28, 'alice@example.com');
        console.log(user.getDetails());

        // Simulate an asynchronous email update
        console.log('Updating email...');
        await delay(1000);
        user.updateEmail('newalice@example.com');
        console.log('Updated User:', user.getDetails());

        // Fetching external data
        console.log('Fetching data from API...');
        let apiData = await fetchData('https://jsonplaceholder.typicode.com/posts');
        console.log('Fetched API Data:', apiData.slice(0, 3)); // Display only first 3 posts

        // Calculate factorial
        console.log('Calculating factorial of 5...');
        let fact = factorial(5);
        console.log(`Factorial of 5: ${fact}`);

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Run the main function
main();
