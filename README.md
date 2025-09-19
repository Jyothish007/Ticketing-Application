# Ticketing Application

This is a basic ticket tracking application designed to help users create and manage tickets for various projects. Currently, the application supports a single user workflow where users can create tickets related to specific projects and track their status. The project serves as a foundational structure, with scope for future enhancements such as multi-user support, ticket assignment, comments, notifications, and more.

---

## Features

- Create tickets associated with specific projects
- View list of tickets
- Basic project and ticket management
- Responsive UI built with Next.js and Tailwind CSS

---

## Technologies Used

The application is built using the following technologies:

- **Next.js** for server-side rendering and React framework
- **React** for building user interfaces
- **Tailwind CSS** for styling
- **MongoDB** and **Mongoose** for database management
- **Font Awesome** for icons

---

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Jyothish007/Ticketing-Application.git
cd Ticketing-Application
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## Project Structure

- `pages/` - Contains Next.js pages for routing
- `components/` - React components
- `lib/` - Utility functions and database connection
- `models/` - Mongoose schemas for MongoDB
- `public/` - Static assets
- `styles/` - Tailwind CSS styles

---

## Future Enhancements

- User authentication and multi-user support
- Ticket assignment and role management
- Commenting and activity logs
- Email notifications
- Project management features

---

## License

This project is for educational and demonstration purposes. Feel free to fork, modify, and extend it as needed.

---

## Contact

For questions or contributions, please open an issue or contact the repository owner.

---

**Note:** This is a foundational version. Continued development will add more features and improvements.
