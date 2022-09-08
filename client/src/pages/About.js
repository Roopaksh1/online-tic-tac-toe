import "../assets/styles/about.css";

const About = () => {
  return (
    <div className="about">
        This Website Is Built With: <br/>
      <p className="tech-stack-links">
        <br />
        <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
        <br />
        <img alt="Express.js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
        <br />
        <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
        <br />
        <img alt="Node" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
        <br />
        <img alt="Socket.io" src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" />
        <br />
        <img alt="Material-UI" src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />
      </p>
      <p className="source-link">
        <a
          href="https://github.com/Roopaksh1/online-tic-tac-toe" rel="noreferrer"
          target="_blank"
        >
          <i className="fa-solid fa-arrow-up-right-from-square fa-xl"></i>{" "}
          Source Code
        </a>
      </p>
    </div>
  );
};

export default About;
