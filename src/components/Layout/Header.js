import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.header}>
      <h1>
        <span className={classes.red}>Rubik's </span> 
        <span className={classes.blue}>Cube </span> 
        <span className={classes.green}>Solver</span>
      </h1>
      <p>A guide for beginners</p>
    </div>
  );
};

export default Header