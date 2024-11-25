const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword() {
    const password = 'mySecurePassword';

    try {
        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Password:', password);
        console.log('Salt:', salt);
        console.log('Hashed password:', hashedPassword);
    } catch (error) {
        console.log('Error:', error);
    }
}

// Function to compare a password with a hash
async function comparePassword() {
    const inputPassword = 'mySecurePassword';
    const hashedPassword = 'yourStoredHashedPassword';

    try {
        // Compare the input password with the stored hashed password
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

        if (isMatch) {
            console.log('Password is correct.');
        } else {
            console.log('Password is incorrect.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to hash the password
hashPassword();

// Call the function to compare the password
comparePassword();