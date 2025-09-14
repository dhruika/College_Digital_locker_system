// import bcrypt from "bcryptjs";

// const hash = "$2b$10$3gGz8GH4v7r3yE/0rxZz6O0mFvHUMjROqWZfI6Z9l0z8o7XDSjK3y";
// const password = "Admin@123";

// bcrypt.compare(password, hash).then(result => console.log("Match?", result));
import bcrypt from "bcryptjs";

const password = "Admin@123";

bcrypt.hash(password, 10).then(hash => {
    console.log("Hashed password:", hash);
});
