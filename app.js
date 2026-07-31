const express = require("express");
require("dotenv").config();

const supabase = require("./db");
const authMiddleware = require("./middleware/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Supabase Connected Successfully 🚀"
  });
});


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: dixit123@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */
// Signup Route
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  res.status(201).json({
    message: "User created successfully",
    user: data.user,
  });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: dixit123@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
// Login Route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({
      error: "Invalid login credentials",
    });
  }

  res.status(200).json({
    message: "Login successful",
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: data.user,
  });
});

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get logged in user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// "eyJhbGciOiJFUzI1NiIsImtpZCI6IjFkYWI1NjkxLTEzNWQtNDhjMC04ZDlmLWQ0MjUzMjc3OGQ4MiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Njem1xbWNqendrcXh5d3NyenJ1LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI2NjQ4OTY2MC0wZTllLTQyMDYtODIxNC02OTRhNzA1N2U2NjEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzg1NTI5NjEzLCJpYXQiOjE3ODU1MjYwMTMsImVtYWlsIjoiZGl4aXQxMjNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImRpeGl0MTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjY2NDg5NjYwLTBlOWUtNDIwNi04MjE0LTY5NGE3MDU3ZTY2MSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzg1NTI2MDEzfV0sInNlc3Npb25faWQiOiJkY2EwMDVhNi02N2Q4LTRkMmMtYTI4Zi1lYWZlZGUxOWQ5MjciLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.Wg4c3O4NpGSwMdfVRrNPbwEJ8nLn3L-WseYlDq9fjbsXSmlC2BP7nHytmdZERT2BTlYY84vawC4fEg10lTPojQ"