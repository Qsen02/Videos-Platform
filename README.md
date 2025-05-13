# Video Platrfom
This is platfrom for posting videos, searching and watching videos.
# Technologies
- Back-end: Express with Typescript, Mongoose and MongoDB.
- Front-end: React with Typescript
# Features
- Guests: They can see video details and watch videos. Also they can search videos but not comment or like videos.
- Users: They can create videos and edit or delete their own. Every user have profile page and can see their own created videos and their followers and followed users. They can like or dislike videos, comment videos, answer to comments on the video and follow other users.
- Every users or guests can change their theme. Theme can be light or dark.
# How to start client and server
- Client: First you can install all dependencies with command `npm i` and next you can start client with command `npm run dev`.
- Server: You can install all dependencies with command `npm i` and nex you can start server with nodemon with command `npm run debug` or start server with node with command `npm start`.
- DB: In server/src/config/mongoose.ts in mongoose.connect() add localDB constant.
# Deployment link:
https://videos-platform-client.onrender.com

Warning: For deployment is used free Render instance and server may start after about 50 seconds.
# Screenshots
-Home page (light)
![Screenshot 2025-05-03 124302](https://github.com/user-attachments/assets/754fc118-f907-4e05-941a-8eed4230796a)
-Home page (dark)
  ![Screenshot 2025-05-03 124147](https://github.com/user-attachments/assets/1485ecec-2d29-42ef-9e22-8f1717711c22)
-Video details
![Screenshot 2025-05-03 124214](https://github.com/user-attachments/assets/38017343-47d6-449f-a7b2-47a2edae55b9)
-Comments
![Screenshot 2025-05-12 213821](https://github.com/user-attachments/assets/c9289063-b912-46cd-a531-e55bbec8cc7c)
-Answers
![Screenshot 2025-05-12 213832](https://github.com/user-attachments/assets/6100beb1-c0af-4ff6-a773-e18ec3fa8e19)
-Profile
![Screenshot 2025-05-03 124249](https://github.com/user-attachments/assets/3d04e6da-f9f0-4b8c-a7b8-78bcabbd4711)




