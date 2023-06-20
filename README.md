# Dona Birita 🍺

## Project Context 💡
Beverage delivery platform for the fictitious distributor Dona Birita.

### Contributors 👥
- [Carolina Lima](https://github.com/cybersekh)
- [Elivelton Machado](https://github.com/El1v)
- [Rafael Silva](https://github.com/RafaMI6)
- [Victor Mendes](https://github.com/ImVictorM)
- [Wlisses Fernando](https://github.com/wlis13)

### Main functionalities of the application 🔧
#### Customer:
- Perform login;
- Perform registration;
- Choose to add items to the cart;
- Place order;
- Monitor the status of orders placed;
- Change order status to "Delivered";
#### Salesperson:
- Perform login;
- track orders;
- Change the status of orders to "Prepare Orders" and "Out for Delivery";
#### Admin:
- Perform login;
- View users;
- Register new users;
- Delete users;

### Acquired Knowledge 📖

In this project, We were able to:
- Develop a Full Stack application;
- Integrate front-end and back-end;
- Build a REST API;
- Organize the code and the general architecture of the application;
- Work together, using daily meetings and Kanban;


## Main Technologies 🧰
<table>
    <caption align="center"><h3>Back-End</h3></caption>
    <thead>
        <tr>
            <th>JavaScript</th>
            <th>Express</th>
            <th>Sequelize</th>
            <th>Node.JS</th>
            <th>MySQL</th>
            <th>JWT</th>
            <th>Docker</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
                    <img 
                         src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
                         alt="javascript" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://expressjs.com/" target="_blank">
                    <img
                        src="https://www.orafox.com/wp-content/uploads/2019/01/expressjs.png"
                        alt="express"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://sequelize.org/" target="_blank">
                    <img
                        src="https://sequelize.org/api/v6/image/brand_logo.png"
                        alt="sequelize"
                        width="40"
                        height="40"
                    />
                </a>
            </td>
            <td align="center">
                <a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" 
                        alt="nodejs" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                 <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> 
                     <img 
                         src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" 
                         alt="mysql" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                 <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noreferrer"> 
                     <img 
                         src="https://jwt.io/img/pic_logo.svg" 
                         alt="jwt" 
                         width="40" 
                         height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" 
                        alt="docker" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>
<table>
    <caption align="center"><h3>Front-End</h3></caption>
    <thead>
        <tr>
            <th>JavaScript</th>
            <th>HTML5</th>
            <th>CSS3</th>
            <th>React</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
                        alt="javascript" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" 
                        alt="html5" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" 
                        alt="css3" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
            <td align="center">
                <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> 
                    <img 
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" 
                        alt="react" 
                        width="40" 
                        height="40"
                    /> 
                </a>
            </td>
        </tr>
    </tbody>
</table>

## Running the application ⚙️

1. Clone the repository and enter it
```
git clone git@github.com:ImVictorM/Dona-Birita.git && cd Dona-Birita
```
<details>
<summary><h4>🐋 Running with docker (recommended)</h4></summary>
  
2. Get the containers running
```
docker-compose up -d
```
3. Enter the api container
```
docker exec -it api-delivery sh
```
4. Create and populate the database
```
npm run db:reset
```

5. Access the page on your browser: http://localhost:3000/
- Client default port: `3000` 
- API default port: `3001`

</details>

<details>
<summary><h4>🖥️ Running locally</h4></summary>

 > You must have node and MySQL installed
 
2. Install the dependencies (both back-end and front-end)
```
npm install
```

3. Rename the file `.env.example` to `.env` in both front-end and back-end directory (change it as you like)

4. Create and populate the database
```
npm run db:reset
```

5. Start the server
```
npm run start
```

6. Access the page on your browser: http://localhost:3000/
- Client default port: `3000` 
- API default port: `3001`

</details>
