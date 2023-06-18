Team Members:

# Allen Jones (@allenjones)

Description: ShareHive is a social networking web application that empowers users to connect, share, and engage with each other. The platform allows users to register, log in, and create various types of posts, including text, video, and image posts. With its smooth single-page functionalities, ShareHive offers a seamless user experience. The application is designed to be highly responsive, and it includes a customizable dark and light mode feature. Coming from a background in Firebase and full-stack development, I was passionate about exploring open-source contributions and discovering alternative solutions. Appwrite caught my attention as a promising Firebase alternative, and I embarked on building something great with this powerful platform. Through this project, I aimed to gain hands-on experience, identify potential challenges, and actively contribute to the Appwrite community.

# Tech Stack:

React (JavaScript)

Context API and useReducer hooks for global state management

Styled Components for styling

# Demo Screenshots

<div style="width:100%; display:flex; flex-direction:column; justify-content:center;">
<img
width="500"
alt="Capture 1"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive12.PNG">

<img
width="500"
alt="Capture 1"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive1.PNG">

<img
width="500"
alt="Capture 2"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive2.png">

<img
width="500"
alt="Capture 3"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive3.PNG">

<img
width="500"
alt="Capture 3"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive3.PNG">

<img
width="270"
alt="Capture 4"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive4.PNG">

<img
width="500"
alt="Capture 5"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive5.PNG">

<img
width="500"
alt="Capture 6"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive6.PNG">

<img
width="500"
alt="Capture 7"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive7.PNG">

<img
width="500"
alt="Capture 8"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive8.PNG">

<img
width="500"
alt="Capture 9"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive9.PNG">

<img
width="500"
alt="Capture 10"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive10.PNG">

<img
width="500"
alt="Capture 11"
src="https://github.com/allenarduino/ShareHive/blob/master/Demo_Screenshots/sharehive11.PNG">

</div>

# How Appwrite Helped

Appwrite played a vital role in the development of ShareHive, providing a robust backend architecture that allowed me to focus on the front end and user interface. Leveraging Appwrite's powerful features, I could seamlessly implement functionalities such as image upload, authentication management, and database management without worrying about the complexities of setting up and maintaining my backend infrastructure. Appwrite's documentation and easy-to-use APIs enabled me to integrate these features smoothly into my application, saving me significant development time and effort.

# Challenges Faced:

During the development process, I encountered a couple of challenges that I had to overcome. One notable challenge was Appwrite's current limitation in handling complex queries like JOINS. As a result, displaying posts associated with a specific user on the home page became a challenge. To address this limitation, I developed a JavaScript function that retrieved the users' data and posts' data separately, and then merged them using JavaScript's powerful array methods like .map and .reduce. While it presented an interesting problem to solve, I am enthusiastic about contributing to the open-source project and collaborating with the Appwrite community to address this limitation and improve the querying capabilities.

Another challenge I faced was ensuring a smooth user experience when redirecting users based on their authentication status (logged in or logged out). The process of determining the user's authentication status using the account.get() method introduced a slight delay in the redirection process. To address this, I implemented a clever workaround by adding a component that displayed a launcher or a blank page with the logo during the initial app launch. This provided users with visual feedback while the authentication status was being determined, improving the overall user experience and reducing confusion.
