const jwt = require('jsonwebtoken');

// Function to create and sign a JWT
function createJWT() {
    const payload = {
        userId: 123,
        username: 'exampleUser'
    };
    const secretKey = 'yourSecretKey';

    // Sign the JWT with the payload and secret key
    const token = jwt.sign(payload, secretKey);

    console.log('JWT Token:', token);
    return token;
}
const token = createJWT();


// Function to verify a JWT
function verifyJWT(token) {
    const secretKey = 'yourSecretKey';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Failed:', err.message);
        } else {
            console.log('JWT Verified. Decoded:', decoded);
        }
    });
}
const jwtTokenToVerify = token;
verifyJWT(jwtTokenToVerify);


// Function to decode a JWT
function decodeJWT(token) {
    const decoded = jwt.decode(token);      // Use when you need to extract the payload data from a JWT without verifying its signature

    console.log('Decoded JWT:', decoded);
}
const jwtToken = token;
decodeJWT(jwtToken);