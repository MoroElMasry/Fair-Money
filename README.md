# Fair Money - Shared Expense Tracker

Fair Money is a REST API web application that simplifies the process of tracking shared expenses among friends or groups. Whether you're splitting the cost of a small meal or managing expenses for a big trip abroad, Fair Money makes it easy to keep track of who owes what. You can create groups, add members, and record expenses effortlessly.

## Features

**Group Management**: Create and manage groups for different shared expense scenarios.

**User-Friendly Interface**: Bootstrap is used for styling, ensuring an intuitive and visually appealing user experience.

**Expense Tracking**: Easily add and manage shared expenses within your groups.

**Flexible Member Management**: Add or remove members from a group at any time.

**Authentication:** We've chosen to implement our own custom authentication system to enhance our understanding of security practices. The decision to do so was driven by the desire to learn more about security, making the process both educational and enjoyable. For our website, which functions as a REST API, we've adopted JWT (JSON Web Tokens) as the authentication method of choice.

## Technologies Used

- **Express**: A web application framework for Node.js used for routing and handling server logic.
- **Pug (formerly Jade)**: A templating engine for rendering dynamic HTML templates.
- **MongoDB**: A NoSQL database used for storing user accounts, group data, and expense records.
- **Bootstrap**: A front-end framework for responsive and stylish web design.

# screenshots 📸

![Frame 4.png](readme_screenshots/Frame_4.png)

![Frame 5.png](readme_screenshots/Frame_5.png)

![Frame 8.png](readme_screenshots/Frame_8.png)

![Frame 6.png](readme_screenshots/Frame_6.png)

![Frame 7.png](readme_screenshots/Frame_7.png)

![Frame 9.png](readme_screenshots/Frame_9.png)

![Frame 10.png](readme_screenshots/Frame_10.png)

![Frame 11.png](readme_screenshots/Frame_11.png)

## Getting Started

**RUN IT LOCALLY:**

To get started with Fair Money on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MoroElMasry/Fair-Money
   ```

2. Navigate to the project directory:

   ```bash
   cd fair-money
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your MongoDB connection (config.env file assumes that MongoDB works on port 27017 with no authentication)

5. Start the server

   ```bash
   npm run start:dev
   ```
Note: You will need to update the database link inside the config.env file according to your MongoDB setup.

**DOCKER OPTION:**

To run Fair Money using Docker, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MoroElMasry/Fair-Money
   ```

2. Navigate to the project directory:

   ```bash
   cd fair-money
   ```

3. Run the following command:

   ```bash
   docker-compose up -d
   ```

Note: Docker will use ports 8000 and 27017 by default. You can customize these ports if needed.