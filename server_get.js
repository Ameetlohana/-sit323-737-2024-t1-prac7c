const express = require("express");
const app = express();

// Function to divide two numbers
const divideTwoNumbers = (n1, n2) => {
    if (n2 === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return n1 / n2;
};

// Route to divide two numbers
app.get("/divideTwoNumbers", (req, res) => {
    // Extracting numbers from query parameters
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    // Validating input
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ error: "Invalid input. Please provide valid numbers." });
    }

    try {
        // Calculate result
        const result = divideTwoNumbers(n1, n2);
        res.json({ statusCode: 200, data: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Default route
app.get("/", (req, res) => {
    const htmlResponse = "<html><body><h1>HELLO THERE</h1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(htmlResponse);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const port = 3040;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
